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
      src: BASE_PATH + "assets/audio/coding-chillstep.mp3"
    },
    {
      title: "Shuangmian",
      artist: "Trangiahung159",
      src: BASE_PATH + "assets/audio/shuangmian.mp3"
    }
  ];

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
        <div id="musicWidgetCover" class="music-widget__cover" aria-hidden="true">
          <i data-lucide="music-2"></i>
        </div>
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

    const titleElement = document.getElementById("musicWidgetTitle");
    const artistElement = document.getElementById("musicWidgetArtist");
    const playPauseButton = document.getElementById("musicWidgetPlayPause");
    const nextButton = document.getElementById("musicWidgetNext");
    const volumeInput = document.getElementById("musicWidgetVolume");
    if (!titleElement || !artistElement || !playPauseButton || !nextButton || !volumeInput) return;

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
      volumeInput.value = String(currentState.volume);
      widget.classList.toggle("is-playing", currentState.isPlaying);

      const label = currentState.isPlaying ? "Pause music" : "Play music";
      playPauseButton.setAttribute("aria-label", label);
      playPauseButton.setAttribute("title", currentState.isPlaying ? "Pause" : "Play");
    };

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

    // Only force silence for a visitor who has never pressed play before —
    // never autoplay audio unprompted. Once the user has opted in at least
    // once, keep the music playing continuously across page navigation and
    // only stop it when they explicitly click pause.
    let hasInteractedBefore = false;
    try {
      hasInteractedBefore = localStorage.getItem(MUSIC_USER_INTERACTED_KEY) === "1";
    } catch {
      hasInteractedBefore = false;
    }

    if (!hasInteractedBefore) {
      currentState = {
        ...currentState,
        isPlaying: false,
        updatedAt: Date.now()
      };
    }

    setExpanded(uiState.expanded, false);
    renderState(currentState);
    requestHostState();

    sendCommand({
      type: "SYNC_STATE",
      state: currentState,
      resumeIfPlaying: hasInteractedBefore && currentState.isPlaying
    });
  }

  // Expose initialization function
  window.__musicWidget = { initializeMusicPlayer };
})();
