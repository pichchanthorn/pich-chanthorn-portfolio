/* =====================================================
   MUSIC-WIDGET.JS — Floating Music Player Widget
   with iframe-based shared audio host
===================================================== */

(() => {
  "use strict";

  const MUSIC_STORAGE_KEY = "portfolio_music_widget_state_v1";
  const MUSIC_UI_STORAGE_KEY = "portfolio_music_widget_ui_v1";
  const MUSIC_USER_INTERACTED_KEY = "portfolio_music_user_interacted_v1";
  const MUSIC_HOST_IFRAME_ID = "musicHostFrame";
  const MUSIC_HOST_CHANNEL = "portfolio_music_iframe_host_v1";

  // Compute base path relative to current page depth
  const BASE_PATH = (() => {
    const scriptTag = document.currentScript;
    if (scriptTag?.src) {
      const scriptUrl = new URL(scriptTag.src);
      const scriptDir = scriptUrl.pathname.substring(0, scriptUrl.pathname.lastIndexOf("/"));
      // Script is in /assets/js/, base is two levels up
      return scriptDir.replace(/\/assets\/js\/?$/, "") + "/";
    }
    return "";
  })();

  const MUSIC_HOST_URL = BASE_PATH + "pages/audio-host.html";

  const MUSIC_PLAYLIST = [
    {
      title: "Coding Chillstep",
      artist: "Romansenyk",
      src: BASE_PATH + "assets/audio/coding-chillstep.mp3",
      cover: BASE_PATH + "assets/img/music-cover-1.jpg"
    },
    {
      title: "Shuangmian",
      artist: "Trangiahung159",
      src: BASE_PATH + "assets/audio/shuangmian.mp3",
      cover: BASE_PATH + "assets/img/music-cover-2.jpg"
    }
  ];

  const MUSIC_FALLBACK_COVER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%230f172a'/%3E%3Cstop offset='100%25' stop-color='%2306472d'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='120' height='120' rx='22' fill='url(%23g)'/%3E%3Ccircle cx='60' cy='60' r='27' fill='none' stroke='%2386efac' stroke-width='4' opacity='0.85'/%3E%3Ccircle cx='60' cy='60' r='6' fill='%2386efac'/%3E%3C/svg%3E";

  function initializeMusicPlayer() {
    if (!MUSIC_PLAYLIST.length) return;

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    const getTrack = index => MUSIC_PLAYLIST[index] || MUSIC_PLAYLIST[0];

    const normalizeMusicState = candidate => {
      const fallback = {
        trackIndex: 0,
        currentTime: 0,
        isPlaying: false,
        volume: 0.7,
        updatedAt: Date.now()
      };

      if (!candidate || typeof candidate !== "object") return fallback;

      return {
        trackIndex: Number.isFinite(candidate.trackIndex)
          ? clamp(candidate.trackIndex, 0, MUSIC_PLAYLIST.length - 1)
          : fallback.trackIndex,
        currentTime: Number.isFinite(candidate.currentTime) && candidate.currentTime >= 0
          ? candidate.currentTime
          : fallback.currentTime,
        isPlaying: Boolean(candidate.isPlaying),
        volume: Number.isFinite(candidate.volume) ? clamp(candidate.volume, 0, 1) : fallback.volume,
        updatedAt: Number.isFinite(candidate.updatedAt) ? candidate.updatedAt : Date.now()
      };
    };

    const readStoredMusicState = () => {
      try {
        const raw = localStorage.getItem(MUSIC_STORAGE_KEY);
        return raw ? normalizeMusicState(JSON.parse(raw)) : normalizeMusicState(null);
      } catch {
        return normalizeMusicState(null);
      }
    };

    const persistMusicState = nextState => {
      const normalized = normalizeMusicState(nextState);
      try {
        localStorage.setItem(MUSIC_STORAGE_KEY, JSON.stringify(normalized));
      } catch {
        // Ignore storage failures.
      }
      return normalized;
    };

    const readUiState = () => {
      try {
        const raw = localStorage.getItem(MUSIC_UI_STORAGE_KEY);
        return raw ? { expanded: Boolean(JSON.parse(raw)?.expanded) } : { expanded: false };
      } catch {
        return { expanded: false };
      }
    };

    const writeUiState = uiState => {
      const normalized = { expanded: Boolean(uiState?.expanded) };
      try {
        localStorage.setItem(MUSIC_UI_STORAGE_KEY, JSON.stringify(normalized));
      } catch {
        // Ignore storage failures.
      }
      return normalized;
    };

    const legacyButton = document.getElementById("musicToggleBtn");
    const legacyAudio = document.getElementById("portfolioMusic");
    if (legacyButton?.parentElement) legacyButton.remove();
    if (legacyAudio?.parentElement) legacyAudio.remove();

    let widget = document.getElementById("musicWidget");
    if (!widget) {
      widget = document.createElement("aside");
      widget.className = "music-widget collapsed";
      widget.id = "musicWidget";
      widget.setAttribute("aria-label", "Music player");
      widget.innerHTML = `
        <img id="musicWidgetCover" class="music-widget__cover" src="${MUSIC_FALLBACK_COVER}" alt="Current track cover" loading="lazy" />
        <div class="music-widget__meta">
          <p id="musicWidgetTitle" class="music-widget__title">${MUSIC_PLAYLIST[0].title}</p>
          <p id="musicWidgetArtist" class="music-widget__artist">${MUSIC_PLAYLIST[0].artist}</p>
          <div class="music-widget__volume-wrap">
            <span class="music-widget__volume-label" aria-hidden="true">VOL</span>
            <input id="musicWidgetVolume" class="music-widget__volume" type="range" min="0" max="1" step="0.01" value="0.7" aria-label="Music volume" />
          </div>
        </div>
        <div class="music-widget__actions">
          <button id="musicWidgetPlayPause" class="music-widget__btn" type="button" aria-label="Play music" title="Play">
            <i data-lucide="play" class="music-widget__icon-play"></i>
            <i data-lucide="pause" class="music-widget__icon-pause"></i>
          </button>
          <button id="musicWidgetNext" class="music-widget__btn" type="button" aria-label="Next song" title="Next">
            <i data-lucide="skip-forward"></i>
          </button>
        </div>
      `;
      document.body.appendChild(widget);
    }

    let hostFrame = document.getElementById(MUSIC_HOST_IFRAME_ID);
    if (!hostFrame) {
      hostFrame = document.createElement("iframe");
      hostFrame.id = MUSIC_HOST_IFRAME_ID;
      hostFrame.src = MUSIC_HOST_URL;
      hostFrame.title = "Shared Audio Host";
      hostFrame.setAttribute("aria-hidden", "true");
      hostFrame.setAttribute("tabindex", "-1");
      hostFrame.setAttribute("allow", "autoplay");
      hostFrame.style.position = "fixed";
      hostFrame.style.width = "0";
      hostFrame.style.height = "0";
      hostFrame.style.border = "0";
      hostFrame.style.opacity = "0";
      hostFrame.style.pointerEvents = "none";
      hostFrame.style.left = "-9999px";
      hostFrame.style.bottom = "-9999px";
      document.body.appendChild(hostFrame);
    }

    if (window.lucide?.createIcons) {
      lucide.createIcons();
    }

    const coverElement = document.getElementById("musicWidgetCover");
    const titleElement = document.getElementById("musicWidgetTitle");
    const artistElement = document.getElementById("musicWidgetArtist");
    const playPauseButton = document.getElementById("musicWidgetPlayPause");
    const nextButton = document.getElementById("musicWidgetNext");
    const volumeInput = document.getElementById("musicWidgetVolume");
    if (!coverElement || !titleElement || !artistElement || !playPauseButton || !nextButton || !volumeInput) return;

    let currentState = readStoredMusicState();
    let uiState = readUiState();
    let hostReady = false;
    const pendingCommands = [];

    const markUserInteracted = () => {
      try {
        localStorage.setItem(MUSIC_USER_INTERACTED_KEY, "1");
      } catch {
        // Ignore storage failures.
      }
    };

    const setExpanded = (expanded, shouldPersist = true) => {
      widget.classList.toggle("collapsed", !expanded);
      widget.classList.toggle("expanded", expanded);
      if (shouldPersist) {
        uiState = writeUiState({ expanded });
      } else {
        uiState = { expanded };
      }
    };

    const renderState = state => {
      currentState = persistMusicState(state);
      const activeTrack = getTrack(currentState.trackIndex);
      titleElement.textContent = activeTrack.title;
      artistElement.textContent = activeTrack.artist;
      coverElement.src = activeTrack.cover || MUSIC_FALLBACK_COVER;
      coverElement.alt = `${activeTrack.title} cover`;
      volumeInput.value = String(currentState.volume);
      widget.classList.toggle("is-playing", currentState.isPlaying);

      const label = currentState.isPlaying ? "Pause music" : "Play music";
      playPauseButton.setAttribute("aria-label", label);
      playPauseButton.setAttribute("title", currentState.isPlaying ? "Pause" : "Play");
    };

    coverElement.addEventListener("error", () => {
      coverElement.src = MUSIC_FALLBACK_COVER;
    });

    const postToHost = message => {
      if (!hostFrame?.contentWindow) return;
      hostFrame.contentWindow.postMessage({ channel: MUSIC_HOST_CHANNEL, ...message }, window.location.origin);
    };

    const sendCommand = message => {
      if (!hostReady) {
        pendingCommands.push(message);
        return;
      }
      postToHost(message);
    };

    const flushPendingCommands = () => {
      while (pendingCommands.length) {
        const command = pendingCommands.shift();
        postToHost(command);
      }
    };

    const requestHostState = () => {
      postToHost({ type: "GET_STATE" });
    };

    const onHostMessage = event => {
      if (event.origin !== window.location.origin) return;
      const payload = event.data;
      if (!payload || payload.channel !== MUSIC_HOST_CHANNEL) return;

      if (payload.type === "HOST_READY") {
        hostReady = true;
        if (payload.state) {
          renderState(normalizeMusicState(payload.state));
        }
        flushPendingCommands();
        return;
      }

      if (payload.type === "STATE_UPDATE" && payload.state) {
        hostReady = true;
        renderState(normalizeMusicState(payload.state));
      }
    };

    window.addEventListener("message", onHostMessage);

    hostFrame.addEventListener("load", () => {
      hostReady = false;
      requestHostState();
    });

    playPauseButton.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      markUserInteracted();

      if (widget.classList.contains("collapsed")) {
        setExpanded(true);
      }

      sendCommand({ type: "TOGGLE_PLAY" });

      if (currentState.isPlaying) {
        setExpanded(false);
      }
    });

    nextButton.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      markUserInteracted();
      sendCommand({ type: "NEXT_TRACK" });
    });

    volumeInput.addEventListener("input", event => {
      event.preventDefault();
      markUserInteracted();
      const volume = Number.parseFloat(volumeInput.value);
      if (!Number.isFinite(volume)) return;

      const nextState = {
        ...currentState,
        volume: clamp(volume, 0, 1),
        updatedAt: Date.now()
      };
      renderState(nextState);
      sendCommand({ type: "SET_VOLUME", volume: nextState.volume });
    });

    // Never autoplay on load; user must explicitly press play.
    currentState = {
      ...currentState,
      isPlaying: false,
      updatedAt: Date.now()
    };

    setExpanded(uiState.expanded, false);
    renderState(currentState);
    requestHostState();

    // Ensure host is paused by default on page load.
    sendCommand({ type: "SYNC_STATE", state: currentState, resumeIfPlaying: false });
  }

  // Expose initialization function
  window.__musicWidget = { initializeMusicPlayer };
})();
