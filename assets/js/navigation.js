/* =====================================================
   NAVIGATION.JS — Sidebar, Mobile Menu, Active Nav,
   Language Switcher (i18n)
===================================================== */

(() => {
  "use strict";

  const I18N_STORAGE_KEY = "portfolio_language";

  const AUTO_TEXT_SELECTOR = [
    "main h1",
    "main h2",
    "main h3",
    "main p",
    "main li",
    "main a span",
    "main button span",
    "main label",
    ".sidebar .logo-name",
    ".sidebar .role",
    ".sidebar .nav span",
    ".site-footer p",
    ".contact-label",
    ".contact-value",
    ".stat-label"
  ].join(",");

  const TRANSLATIONS = {
    en: {
      "menu.toggle": "Toggle menu",
      "nav.main": "Main navigation",
      "nav.home": "Home",
      "nav.about": "About",
      "nav.skills": "Skills",
      "nav.projects": "Projects",
      "nav.certificates": "Certificates",
      "nav.education": "Education",
      "nav.experience": "Experience",
      "nav.contact": "Contact",
      "role.student": "IT Student & Aspiring Full-Stack Developer",
      "role.fullstack": "Full-Stack Developer",
      "home.welcome": "Welcome to my portfolio",
      "home.cta.projects": "View Projects",
      "home.cta.cv": "Download CV",
      "home.cta.contactMe": "Contact Me",
      "footer.built": "Built with HTML, CSS & JavaScript",
      "footer.privacy": "Privacy Policy",
      "footer.rights": "Pich Chanthorn. All rights reserved.",
      "lang.label": "Language",
      "lang.en": "English",
      "lang.km": "Khmer",
      "contact.subtitle": "Feel free to send me a message or connect with me on social media.",
      "contact.email": "Email",
      "contact.phone": "Phone",
      "contact.location": "Location",
      "contact.form.title": "Send Me a Message",
      "contact.form.name": "Your Name",
      "contact.form.email": "Email Address",
      "contact.form.message": "Your Message",
      "contact.form.placeholder.name": "Enter your name",
      "contact.form.placeholder.email": "Enter your email",
      "contact.form.placeholder.message": "Write your message...",
      "contact.form.submit": "Send Message",
      "contact.form.sending": "Sending...",
      "contact.form.success": "✅ Message sent successfully!",
      "contact.form.error": "❌ Failed to send message. Please try again.",
      "contact.form.rateLimit": "❌ Please wait a few seconds before sending again.",
      "projects.back": "Back to Projects",
      "projects.about": "About this Project",
      "projects.features": "Key Features",
      "projects.achievements": "Key Achievements",
      "projects.techStack": "Tech Stack",
      "projects.links": "Project Links",
      "projects.other": "Other Projects",
      "projects.viewCode": "View Source Code",
      "projects.liveDemo": "Live Demo",
      "projects.badgeNew": "New",
      "projects.card.smartAdmin.title": "Smart Admin Dashboard",
      "projects.card.smartAdmin.desc": "A secure PHP and MySQL dashboard with authentication, role-based access, and management tools for users, students, products, and profiles.",
      "projects.card.pctnShop.title": "PCTN Fertilizer Shop",
      "projects.card.pctnShop.desc": "A modern agriculture business website showcasing products, services, gallery, and contact channels for a Cambodian brand.",
      "projects.card.youtubeBot.title": "YouTube Downloader Telegram Bot",
      "projects.card.youtubeBot.desc": "A Python Telegram bot that downloads YouTube videos or audio from simple chat commands using yt-dlp.",
      "cv.title": "My CV Library",
      "cv.subtitle": "Choose CV for your position",
      "cv.view": "View",
      "cv.download": "Download",
      "cv.backHome": "← Back to Home",
      "cert.title": "My Certificates",
      "cert.subtitle": "Verified credentials, cybersecurity training, academic achievements, and technical learning records.",
      "cert.chip.count": "10+ Certificates",
      "cert.chip.google": "Google",
      "cert.chip.cisco": "Cisco",
      "cert.chip.cyber": "Cybersecurity",
      "cert.chip.academic": "Academic Excellence",
      "cert.summary.title": "Credential Summary",
      "cert.summary.total": "Total Certificates",
      "cert.summary.focus.label": "Main Focus",
      "cert.summary.focus.value": "Cybersecurity & IT Support",
      "cert.summary.providers": "Providers",
      "cert.summary.latest.label": "Latest",
      "cert.summary.latest.value": "2025",
      "cert.filters.title": "Filter Credentials",
      "cert.filters.aria": "Certificate filters",
      "cert.filter.all": "All",
      "cert.filter.google": "Google",
      "cert.filter.cisco": "Cisco",
      "cert.filter.academic": "Academic",
      "cert.filter.cyber": "Cybersecurity",
      "cert.filter.achievement": "Achievement",
      "cert.section.featured": "Featured Credentials",
      "cert.section.cyber": "Cybersecurity Certifications",
      "cert.section.google": "Google / Coursera Certificates",
      "cert.section.academic": "Academic & Other Achievements",
      "skills.section.frontend": "Frontend Development",
      "skills.section.frameworks": "Modern Frontend Frameworks",
      "skills.section.backend": "Backend & Database",
      "skills.section.python": "Python & Automation",
      "skills.section.tools": "Tools & Workflow",
      "skills.section.ux": "UI/UX & Professional Skills",
      "skills.section.frontend.primary": "Frontend",
      "skills.section.frontend.highlight": "Development",
      "skills.section.frameworks.primary": "Modern",
      "skills.section.frameworks.highlight": "Frontend Frameworks",
      "skills.section.backend.primary": "Backend",
      "skills.section.backend.highlight": "& Database",
      "skills.section.python.primary": "Python",
      "skills.section.python.highlight": "& Automation",
      "skills.section.tools.primary": "Tools",
      "skills.section.tools.highlight": "& Workflow",
      "skills.section.ux.primary": "UI/UX",
      "skills.section.ux.highlight": "& Professional Skills",
      "skills.html.label": "HTML",
      "skills.html.desc": "Semantic structure, clean markup, and accessible page layout.",
      "skills.css.label": "CSS",
      "skills.css.desc": "Responsive styling, Flexbox, Grid, animations, and modern UI.",
      "skills.js.label": "JavaScript",
      "skills.js.desc": "DOM interaction, events, filtering, theme switching, and interactive UI.",
      "skills.responsive.label": "Responsive Design",
      "skills.responsive.desc": "Mobile-first layouts for desktop, tablet, and mobile screens.",
      "skills.tailwind.label": "Tailwind CSS",
      "skills.tailwind.desc": "Utility-first styling for clean and modern interfaces.",
      "skills.bootstrap.label": "Bootstrap",
      "skills.bootstrap.desc": "Fast responsive UI development using components and grid system.",
      "skills.react.label": "React",
      "skills.react.desc": "Component-based UI development for modern web applications.",
      "skills.next.label": "Next.js",
      "skills.next.desc": "Multi-page frontend apps with routing and reusable components.",
      "skills.typescript.label": "TypeScript",
      "skills.typescript.desc": "Typed JavaScript for safer and more maintainable frontend code.",
      "skills.shadcn.label": "shadcn/ui",
      "skills.shadcn.desc": "Reusable UI components for clean and modern interface design.",
      "skills.php.label": "PHP",
      "skills.php.desc": "Server-side development for dashboard and web systems.",
      "skills.mysql.label": "MySQL",
      "skills.mysql.desc": "Database queries, data management, and relational structure.",
      "skills.pdo.label": "PDO / Prepared Statements",
      "skills.pdo.desc": "Secure database access and SQL injection prevention.",
      "skills.auth.label": "Authentication System",
      "skills.auth.desc": "Login, logout, session handling, and password verification.",
      "skills.crud.label": "CRUD System",
      "skills.crud.desc": "Create, read, update, and delete functionality for admin systems.",
      "skills.rbac.label": "Role-Based Access Control",
      "skills.rbac.desc": "Admin/user permission handling and protected dashboard pages.",
      "skills.reset.label": "Password Reset Flow",
      "skills.reset.desc": "Secure password reset tokens, expiry handling, and account recovery logic.",
      "skills.security.label": "Web Security Basics",
      "skills.security.desc": "Password hashing, CSRF protection, input validation, and secure sessions.",
      "skills.python.label": "Python",
      "skills.python.desc": "Script development, automation logic, and bot workflows.",
      "skills.telegram.label": "Telegram Bot Development",
      "skills.telegram.desc": "Building command-based Telegram bots using Python.",
      "skills.ytdlp.label": "yt-dlp Integration",
      "skills.ytdlp.desc": "YouTube video/audio download workflow integration.",
      "skills.botapi.label": "Telegram Bot API",
      "skills.botapi.desc": "Handling Telegram commands, messages, and file delivery.",
      "skills.botlogic.label": "Command-Based Bot Logic",
      "skills.botlogic.desc": "User command handling, input validation, and media response flow.",
      "skills.git.label": "Git & GitHub",
      "skills.git.desc": "Version control, repositories, commits, branching, and publishing.",
      "skills.vscode.label": "VS Code",
      "skills.vscode.desc": "Main development environment with extensions and productivity workflow.",
      "skills.ghpages.label": "GitHub Pages",
      "skills.ghpages.desc": "Hosting and publishing static portfolio websites.",
      "skills.docs.label": "Project Documentation",
      "skills.docs.desc": "Writing README files, setup guides, project structure, and usage instructions.",
      "skills.debug.label": "Debugging",
      "skills.debug.desc": "Finding and fixing frontend, backend, and layout issues.",
      "skills.devtools.label": "Browser DevTools",
      "skills.devtools.desc": "Inspecting layout, testing responsiveness, and debugging browser issues.",
      "skills.figma.label": "Figma (UI/UX)",
      "skills.figma.desc": "Wireframes, mockups, and interactive prototypes.",
      "skills.ai.label": "AI Tools & Prompting",
      "skills.ai.desc": "Using AI tools for coding, debugging, research, and creativity.",
      "skills.canva.label": "Canva",
      "skills.canva.desc": "Posters, presentations, social media content, and graphic design.",
      "skills.ui.label": "UI Layout Design",
      "skills.ui.desc": "Clean spacing, card layout, visual hierarchy, and consistent components.",
      "skills.clean.label": "Clean Code Structure",
      "skills.clean.desc": "Organized folders, reusable sections, and maintainable project files.",
      "skills.solve.label": "Problem Solving",
      "skills.solve.desc": "Breaking real-world problems into practical technical solutions.",
      "skills.plan.label": "Project Planning",
      "skills.plan.desc": "Planning pages, features, data structure, and development flow.",
      "skills.write.label": "Technical Writing",
      "skills.write.desc": "Explaining project purpose, features, setup steps, and learning outcomes clearly.",
      "about.hero.lead": "I am an Information Technology student with a strong interest in frontend-focused full-stack web development. I build responsive, user-friendly, and practical web applications while continuously improving my skills through academic projects, personal work, and hands-on experience.",
      "experience.openTo.role1": "Junior Full-Stack Developer Roles",
      "experience.openTo.role2": "Frontend Developer Internships",
      "experience.openTo.role3": "Web Application Development Projects",
      "experience.openTo.role4": "Remote & Hybrid Opportunities",
      "experience.openTo.role5": "Open Source Collaboration",
      "home.startConversation": "Start a Conversation",
      "home.emailMe": "Email Me",
      "home.stat.projects1": "Projects",
      "home.stat.projects2": "Completed",
      "home.stat.months1": "Months",
      "home.stat.months2": "Learning & Practice",
      "home.stat.years1": "Years",
      "home.stat.years2": "Hands-on Experience",
      "about.title1": "About",
      "about.title2": "Me",
      "about.who.title1": "Who I",
      "about.who.title2": "Am",
      "about.what.title1": "What I",
      "about.what.title2": "Do",
      "about.highlights.title1": "My",
      "about.highlights.title2": "Highlights",
      "about.tools.title1": "My Tools &",
      "about.tools.title2": "Technologies",
      "about.values.title1": "My Work",
      "about.values.title2": "Values",
      "about.quick.role": "Role: Information Technology Student & Aspiring Full-Stack Web Developer",
      "about.quick.location": "Location: Phnom Penh, Cambodia",
      "about.quick.study": "Study: Information Technology Student",
      "about.quick.focus": "Focus: Modern Web Development & UI Quality",
      "about.values.item1": "Clean code and structured organization",
      "about.values.item2": "User-friendly design and accessibility mindset",
      "about.values.item3": "Clear collaboration and communication",
      "about.values.item4": "Responsibility in delivery and quality",
      "about.values.item5": "Growth mindset through continuous learning",
      "about.cta.viewProjects": "View My Projects",
      "about.cta.contactMe": "Contact Me",
      "projects.title1": "My",
      "projects.title2": "Projects",
      "blog.title1": "My",
      "blog.title2": "Dev Blog",
      "edu.title1": "My",
      "edu.title2": "Education",
      "edu.stats.title1": "Academic",
      "edu.stats.title2": "Stats",
      "edu.timeline.title1": "Education",
      "edu.timeline.title2": "Timeline",
      "exp.title1": "My",
      "exp.title2": "Experience",
      "exp.careerFocus.title": "Career Focus",
      "exp.careerFocus.text": "Currently building professional experience in data operations while actively developing expertise in full-stack web development, modern web technologies, and software engineering best practices.",
      "exp.coreStrengths.title": "Core Strengths",
      "exp.chip.responsive": "Responsive UI Development",
      "exp.chip.cleanCode": "Clean Code Structure",
      "exp.chip.component": "Component Thinking",
      "exp.chip.git": "Git Workflow",
      "exp.openTo.title": "Open To",
      "contact.title1": "Get in",
      "contact.title2": "Touch",
      "privacy.title1": "Privacy",
      "privacy.title2": "Policy",
      "privacy.subtitle": "This policy explains what information this portfolio website collects, how it is used, and the choices you have — written in plain language, with no hidden data practices.",
      "privacy.updated": "Last updated: July 25, 2026",
      "privacy.toc.title": "On this page",
      "privacy.toc.aria": "Table of contents",
      "privacy.toc.overview": "Overview",
      "privacy.toc.collect": "Information We Collect",
      "privacy.toc.cookies": "Cookies & Local Storage",
      "privacy.toc.use": "How We Use Information",
      "privacy.toc.thirdParty": "Third-Party Services",
      "privacy.toc.sharing": "Data Sharing",
      "privacy.toc.retention": "Data Retention",
      "privacy.toc.rights": "Your Rights & Choices",
      "privacy.toc.children": "Children's Privacy",
      "privacy.toc.links": "External Links",
      "privacy.toc.changes": "Changes to This Policy",
      "privacy.toc.contact": "Contact",
      "privacy.s1.title": "1. Overview",
      "privacy.s1.body": "This Privacy Policy applies to <strong>pichchanthorn.me</strong> (the \"Site\"), a personal portfolio built and maintained by Pich Chanthorn to showcase projects, skills, and professional background. The Site is a static website with a contact form — it does not require account registration, does not process payments, and does not sell personal data. This policy describes the limited data the Site collects and why.",
      "privacy.s2.title": "2. Information We Collect",
      "privacy.s2.h3a": "Information you provide directly",
      "privacy.s2.p1": "When you submit the <a href='contact.html'>Contact form</a>, the following fields are sent via EmailJS to the site owner's inbox:",
      "privacy.s2.li1": "<strong>Name</strong> — so a reply can be addressed to you.",
      "privacy.s2.li2": "<strong>Email address</strong> — so a reply can be sent back to you.",
      "privacy.s2.li3": "<strong>Message content</strong> — whatever you choose to write.",
      "privacy.s2.h3b": "Information collected automatically",
      "privacy.s2.p2": "The Site uses <strong>Google Analytics</strong> to understand how visitors use the Site (e.g. which pages are viewed and how long a visit lasts). This may include:",
      "privacy.s2.li4": "Pages visited and time spent on the Site",
      "privacy.s2.li5": "Approximate location (derived from IP address, not precise GPS)",
      "privacy.s2.li6": "Browser type, device type, and operating system",
      "privacy.s2.li7": "Referring website or search terms that led you here",
      "privacy.s2.p3": "This data is aggregated and anonymized by Google Analytics; it is not used to personally identify individual visitors.",
      "privacy.s3.title": "3. Cookies & Local Storage",
      "privacy.s3.p1": "Google Analytics sets first-party cookies (such as <code>_ga</code>) to distinguish unique visitors. You can block or delete these at any time through your browser settings.",
      "privacy.s3.p2": "Separately, the Site uses your browser's <strong>local storage</strong> — not cookies — to remember two preferences on your device only: your selected color theme (<code>portfolio_theme</code>) and language (<code>portfolio_language</code>). This information never leaves your browser and is not sent to any server.",
      "privacy.s4.title": "4. How We Use Information",
      "privacy.s4.li1": "To respond to messages sent through the Contact form.",
      "privacy.s4.li2": "To understand which content visitors find useful, and improve the Site accordingly.",
      "privacy.s4.li3": "To remember your display preferences (theme and language) between visits.",
      "privacy.s4.li4": "To maintain the security and proper functioning of the Site.",
      "privacy.s4.p1": "Information is never used for advertising, profiling, or resold to third parties.",
      "privacy.s5.title": "5. Third-Party Services",
      "privacy.s5.p1": "The Site relies on the following third-party services, each governed by its own privacy policy:",
      "privacy.s5.li1": "<strong>Google Analytics</strong> — visitor traffic and usage analytics.",
      "privacy.s5.li2": "<strong>EmailJS</strong> — delivers Contact form submissions by email without a custom backend server.",
      "privacy.s5.li3": "<strong>GitHub Pages</strong> — hosts and serves this static website.",
      "privacy.s5.li4": "<strong>unpkg &amp; jsDelivr (CDNs)</strong> — deliver the Lucide icon library and EmailJS script files.",
      "privacy.s5.p2": "These providers may log standard technical data (such as IP address) as part of delivering their service, independently of this Site.",
      "privacy.s6.title": "6. Data Sharing & Disclosure",
      "privacy.s6.p1": "No personal data is sold or rented. Information is shared only with the service providers listed above, solely to operate the Site, or where disclosure is required by law.",
      "privacy.s7.title": "7. Data Retention",
      "privacy.s7.p1": "Contact form messages are kept in the site owner's email inbox only for as long as needed to respond and maintain a record of correspondence. Analytics data is retained according to Google Analytics' default retention settings. Local storage preferences persist only until you clear your browser data.",
      "privacy.s8.title": "8. Your Rights & Choices",
      "privacy.s8.li1": "<strong>Opt out of analytics</strong> — use a browser extension such as the Google Analytics Opt-out Add-on, or enable Do Not Track / block third-party cookies in your browser.",
      "privacy.s8.li2": "<strong>Clear local preferences</strong> — clear your browser's local storage/site data for pichchanthorn.me at any time.",
      "privacy.s8.li3": "<strong>Access or delete your message</strong> — email the address below to request that a previous Contact form submission be deleted.",
      "privacy.s9.title": "9. Children's Privacy",
      "privacy.s9.p1": "The Site is a professional portfolio and is not directed at, or knowingly used to collect information from, children under 13.",
      "privacy.s10.title": "10. External Links",
      "privacy.s10.p1": "The Site links out to external platforms such as GitHub, LinkedIn, and Coursera. This Privacy Policy does not cover those third-party sites — please review their own privacy policies before sharing information with them.",
      "privacy.s11.title": "11. Changes to This Policy",
      "privacy.s11.p1": "This policy may be updated occasionally to reflect changes to the Site or applicable regulations. The \"Last updated\" date at the top of this page reflects the most recent revision.",
      "privacy.s12.title": "12. Contact",
      "privacy.s12.p1": "Questions about this Privacy Policy, or requests to access or delete your data, can be sent to <a href='mailto:pich_chanthorn@pp.bbu.edu.kh'>pich_chanthorn@pp.bbu.edu.kh</a>."
    },
    km: {
      "menu.toggle": "បើក/បិទ ម៉ឺនុយ",
      "nav.main": "ម៉ឺនុយមេ",
      "nav.home": "ទំព័រដើម",
      "nav.about": "អំពីខ្ញុំ",
      "nav.skills": "ជំនាញ",
      "nav.projects": "គម្រោង",
      "nav.certificates": "វិញ្ញាបនបត្រ",
      "nav.education": "ការអប់រំ",
      "nav.experience": "បទពិសោធន៍",
      "nav.contact": "ទំនាក់ទំនង",
      "role.student": "និស្សិត IT និងអ្នកអភិវឌ្ឍន៍ Full-Stack កំពុងអភិវឌ្ឍ",
      "role.fullstack": "អ្នកអភិវឌ្ឍន៍ Full-Stack",
      "home.welcome": "សូមស្វាគមន៍មកកាន់ផតហ្វូលីយ៉ូរបស់ខ្ញុំ",
      "home.cta.projects": "មើលគម្រោង",
      "home.cta.cv": "ទាញយក CV",
      "home.cta.contactMe": "ទាក់ទងខ្ញុំ",
      "footer.built": "បង្កើតដោយ HTML, CSS និង JavaScript",
      "footer.privacy": "គោលការណ៍ឯកជនភាព",
      "footer.rights": "Pich Chanthorn។ រក្សាសិទ្ធិគ្រប់យ៉ាង។",
      "lang.label": "ភាសា",
      "lang.en": "អង់គ្លេស",
      "lang.km": "ខ្មែរ",
      "contact.subtitle": "អ្នកអាចផ្ញើសារ ឬភ្ជាប់ទំនាក់ទំនងតាមបណ្ដាញសង្គមរបស់ខ្ញុំបាន។",
      "contact.email": "អ៊ីមែល",
      "contact.phone": "ទូរស័ព្ទ",
      "contact.location": "ទីតាំង",
      "contact.form.title": "ផ្ញើសារមកខ្ញុំ",
      "contact.form.name": "ឈ្មោះរបស់អ្នក",
      "contact.form.email": "អាសយដ្ឋានអ៊ីមែល",
      "contact.form.message": "សាររបស់អ្នក",
      "contact.form.placeholder.name": "បញ្ចូលឈ្មោះរបស់អ្នក",
      "contact.form.placeholder.email": "បញ្ចូលអ៊ីមែលរបស់អ្នក",
      "contact.form.placeholder.message": "សរសេរសាររបស់អ្នក...",
      "contact.form.submit": "ផ្ញើសារ",
      "contact.form.sending": "កំពុងផ្ញើ...",
      "contact.form.success": "✅ ផ្ញើសារបានជោគជ័យ!",
      "contact.form.error": "❌ ផ្ញើសារមិនជោគជ័យ។ សូមព្យាយាមម្តងទៀត។",
      "contact.form.rateLimit": "❌ សូមរង់ចាំបន្តិច មុនពេលផ្ញើម្ដងទៀត។",
      "projects.back": "ត្រឡប់ទៅគម្រោង",
      "projects.about": "អំពីគម្រោងនេះ",
      "projects.features": "មុខងារសំខាន់ៗ",
      "projects.achievements": "សមិទ្ធផលសំខាន់ៗ",
      "projects.techStack": "បច្ចេកវិទ្យា",
      "projects.links": "តំណភ្ជាប់គម្រោង",
      "projects.other": "គម្រោងផ្សេងៗ",
      "projects.viewCode": "មើលកូដដើម",
      "projects.liveDemo": "មើល Demo",
      "projects.badgeNew": "ថ្មី",
      "projects.card.smartAdmin.title": "ផ្ទាំងគ្រប់គ្រង Smart Admin",
      "projects.card.smartAdmin.desc": "ផ្ទាំងគ្រប់គ្រង PHP និង MySQL សុវត្ថិភាព មានការផ្ទៀងផ្ទាត់ ការគ្រប់គ្រងតួនាទី និងឧបករណ៍គ្រប់គ្រងអ្នកប្រើ សិស្ស ផលិតផល និងប្រវត្តិ។",
      "projects.card.pctnShop.title": "ហាងជី PCTN",
      "projects.card.pctnShop.desc": "គេហទំព័រអាជីវកម្មកសិកម្មទំនើប បង្ហាញផលិតផល សេវាកម្ម បរិវេណរូបភាព និងបណ្តាញទំនាក់ទំនង សម្រាប់ម៉ាកកម្ពុជា។",
      "projects.card.youtubeBot.title": "ប៉ូត Telegram ទាញយក YouTube",
      "projects.card.youtubeBot.desc": "ប៉ូត Telegram ជា Python សម្រាប់ទាញយកវីដេអូ ឬអូឌីយ៉ូ YouTube តាមពាក្យបញ្ជាសាមញ្ញ ដោយប្រើ yt-dlp។",
      "cv.title": "បណ្ណាល័យ CV របស់ខ្ញុំ",
      "cv.subtitle": "ជ្រើសរើស CV សម្រាប់តួនាទីរបស់អ្នក",
      "cv.view": "មើល",
      "cv.download": "ទាញយក",
      "cv.backHome": "← ត្រឡប់ទៅទំព័រដើម",
      "cert.title": "វិញ្ញាបនបត្ររបស់ខ្ញុំ",
      "cert.subtitle": "វិញ្ញាបនបត្រដែលបានផ្ទៀងផ្ទាត់ ការបណ្ដុះបណ្ដាលសន្តិសុខបច្ចេកវិទ្យា សមិទ្ធផលការសិក្សា និងកំណត់ត្រាការសិក្សាបច្ចេកទេស។",
      "cert.chip.count": "វិញ្ញាបនបត្រ 10+",
      "cert.chip.google": "Google",
      "cert.chip.cisco": "Cisco",
      "cert.chip.cyber": "សន្តិសុខបច្ចេកវិទ្យា",
      "cert.chip.academic": "លទ្ធផលសិក្សាល្អឥតខ្ចោះ",
      "cert.summary.title": "សេចក្តីសង្ខេបវិញ្ញាបនបត្រ",
      "cert.summary.total": "ចំនួនវិញ្ញាបនបត្រ",
      "cert.summary.focus.label": "ផ្តោតសំខាន់",
      "cert.summary.focus.value": "សន្តិសុខបច្ចេកវិទ្យា និងគាំទ្របច្ចេកទេស IT",
      "cert.summary.providers": "អ្នកផ្តល់",
      "cert.summary.latest.label": "ថ្មីបំផុត",
      "cert.summary.latest.value": "2025",
      "cert.filters.title": "តម្រងវិញ្ញាបនបត្រ",
      "cert.filters.aria": "តម្រងវិញ្ញាបនបត្រ",
      "cert.filter.all": "ទាំងអស់",
      "cert.filter.google": "Google",
      "cert.filter.cisco": "Cisco",
      "cert.filter.academic": "វិជ្ជាការ",
      "cert.filter.cyber": "សន្តិសុខបច្ចេកវិទ្យា",
      "cert.filter.achievement": "សមិទ្ធផល",
      "cert.section.featured": "វិញ្ញាបនបត្រពិសេស",
      "cert.section.cyber": "វិញ្ញាបនបត្រសន្តិសុខបច្ចេកវិទ្យា",
      "cert.section.google": "វិញ្ញាបនបត្រ Google / Coursera",
      "cert.section.academic": "សមិទ្ធផលអប់រំ និងផ្សេងៗ",
      "skills.section.frontend": "ការអភិវឌ្ឍផ្នែកមុខ",
      "skills.section.frameworks": "Frameworks ផ្នែកមុខទំនើប",
      "skills.section.backend": "ផ្នែកក្រោយ និងមូលដ្ឋានទិន្នន័យ",
      "skills.section.python": "Python និងស្វ័យប្រវត្តិកម្ម",
      "skills.section.tools": "ឧបករណ៍ និងលំហូរការងារ",
      "skills.section.ux": "ជំនាញ UI/UX និងវិជ្ជាជីវៈ",
      "skills.section.frontend.primary": "ផ្នែកមុខ",
      "skills.section.frontend.highlight": "អភិវឌ្ឍ",
      "skills.section.frameworks.primary": "ទំនើប",
      "skills.section.frameworks.highlight": "Frameworks ផ្នែកមុខ",
      "skills.section.backend.primary": "ផ្នែកក្រោយ",
      "skills.section.backend.highlight": "និងមូលដ្ឋានទិន្នន័យ",
      "skills.section.python.primary": "Python",
      "skills.section.python.highlight": "និងស្វ័យប្រវត្តិកម្ម",
      "skills.section.tools.primary": "ឧបករណ៍",
      "skills.section.tools.highlight": "និងលំហូរការងារ",
      "skills.section.ux.primary": "UI/UX",
      "skills.section.ux.highlight": "និងជំនាញវិជ្ជាជីវៈ",
      "skills.html.label": "HTML",
      "skills.html.desc": "រចនាសម្ព័ន្ធសមរម្យ មាតិកាស្អាត និងប្លង់អាចចូលប្រើបាន។",
      "skills.css.label": "CSS",
      "skills.css.desc": "រចនាបែបឆ្លើយតប Flexbox, Grid, អានីម៉េសិន និង UI ទំនើប។",
      "skills.js.label": "JavaScript",
      "skills.js.desc": "អន្តរកម្ម DOM ព្រឹត្តិការណ៍ តម្រង ប្តូរម៉ូដ និង UI អន្តរកម្ម។",
      "skills.responsive.label": "រចនាបែបឆ្លើយតប",
      "skills.responsive.desc": "ប្លង់ Mobile-first សម្រាប់ Desktop, Tablet និង Mobile។",
      "skills.tailwind.label": "Tailwind CSS",
      "skills.tailwind.desc": "រចនាបែប Utility-first សម្រាប់ផ្ទៃមុខស្អាត និងទំនើប។",
      "skills.bootstrap.label": "Bootstrap",
      "skills.bootstrap.desc": "បង្កើត UI ឆ្លើយតបឆាប់រហ័ស ដោយប្រើ Components និង Grid។",
      "skills.react.label": "React",
      "skills.react.desc": "អភិវឌ្ឍ UI តាម Component សម្រាប់កម្មវិធី Web ទំនើប។",
      "skills.next.label": "Next.js",
      "skills.next.desc": "កម្មវិធី frontend ច្រើនទំព័រ មាន routing និង components ប្រើឡើងវិញ។",
      "skills.typescript.label": "TypeScript",
      "skills.typescript.desc": "JavaScript មានប្រភេទទិន្នន័យ សម្រាប់កូដមានសុវត្ថិភាព និងងាយថែទាំ។",
      "skills.shadcn.label": "shadcn/ui",
      "skills.shadcn.desc": "UI components ប្រើឡើងវិញ សម្រាប់ផ្ទៃមុខស្អាត និងទំនើប។",
      "skills.php.label": "PHP",
      "skills.php.desc": "អភិវឌ្ឍផ្នែកក្រោយសម្រាប់ Dashboard និងប្រព័ន្ធ Web។",
      "skills.mysql.label": "MySQL",
      "skills.mysql.desc": "Query ទិន្នន័យ ការគ្រប់គ្រង និងរចនាសម្ព័ន្ធ Relational។",
      "skills.pdo.label": "PDO / Prepared Statements",
      "skills.pdo.desc": "ចូលប្រើទិន្នន័យប្រកបដោយសុវត្ថិភាព និងការពារ SQL Injection។",
      "skills.auth.label": "ប្រព័ន្ធផ្ទៀងផ្ទាត់",
      "skills.auth.desc": "Login, logout, session handling និងការផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់។",
      "skills.crud.label": "ប្រព័ន្ធ CRUD",
      "skills.crud.desc": "Create, read, update និង delete សម្រាប់ប្រព័ន្ធ Admin។",
      "skills.rbac.label": "ការគ្រប់គ្រងសិទ្ធិតាមតួនាទី",
      "skills.rbac.desc": "ការគ្រប់គ្រងសិទ្ធិ admin/user និងទំព័រដែលត្រូវបានការពារ។",
      "skills.reset.label": "លំហូរកំណត់ពាក្យសម្ងាត់ឡើងវិញ",
      "skills.reset.desc": "Token កំណត់ពាក្យសម្ងាត់ឡើងវិញ អាយុកាល និងលំហូរសង្គ្រោះគណនី។",
      "skills.security.label": "មូលដ្ឋានសុវត្ថិភាព Web",
      "skills.security.desc": "Hash ពាក្យសម្ងាត់ ការពារ CSRF ការផ្ទៀងផ្ទាត់ input និង session សុវត្ថិភាព។",
      "skills.python.label": "Python",
      "skills.python.desc": "អភិវឌ្ឍស្គ្រីប logic ស្វ័យប្រវត្តិ និងលំហូរ Bot។",
      "skills.telegram.label": "ការអភិវឌ្ឍ Bot Telegram",
      "skills.telegram.desc": "បង្កើត Bot Telegram តាមពាក្យបញ្ជា ដោយប្រើ Python។",
      "skills.ytdlp.label": "បញ្ចូល yt-dlp",
      "skills.ytdlp.desc": "បញ្ចូលលំហូរទាញយកវីដេអូ/អូឌីយ៉ូ YouTube។",
      "skills.botapi.label": "Telegram Bot API",
      "skills.botapi.desc": "គ្រប់គ្រងពាក្យបញ្ជា សារ និងការផ្ញើឯកសារ Telegram។",
      "skills.botlogic.label": "លូជិខ្សែពាក្យបញ្ជា Bot",
      "skills.botlogic.desc": "ការគ្រប់គ្រងពាក្យបញ្ជា ផ្ទៀងផ្ទាត់ input និងលំហូរឆ្លើយតបមេឌៀ។",
      "skills.git.label": "Git & GitHub",
      "skills.git.desc": "Version control, repository, commit, branching និង publishing។",
      "skills.vscode.label": "VS Code",
      "skills.vscode.desc": "បរិស្ថានអភិវឌ្ឍសំខាន់ មាន extension និងលំហូរការងារផលិតភាព។",
      "skills.ghpages.label": "GitHub Pages",
      "skills.ghpages.desc": "Hosting និងបោះពុម្ពផ្សាយគេហទំព័រ static portfolio។",
      "skills.docs.label": "ឯកសារគម្រោង",
      "skills.docs.desc": "សរសេរ README, សៀវភៅណែនាំ, រចនាសម្ព័ន្ធគម្រោង និងការប្រើប្រាស់។",
      "skills.debug.label": "Debugging",
      "skills.debug.desc": "ស្វែងរក និងជួសជុលបញ្ហា frontend, backend និង layout។",
      "skills.devtools.label": "Browser DevTools",
      "skills.devtools.desc": "ពិនិត្យ layout សាកល្បង responsiveness និង debug ក្នុង browser។",
      "skills.figma.label": "Figma (UI/UX)",
      "skills.figma.desc": "Wireframes, mockups និង prototype អន្តរកម្ម។",
      "skills.ai.label": "ឧបករណ៍ AI និង Prompting",
      "skills.ai.desc": "ប្រើឧបករណ៍ AI សម្រាប់ coding, debugging, research និង creativity។",
      "skills.canva.label": "Canva",
      "skills.canva.desc": "Poster, presentation, content បណ្តាញសង្គម និងរចនាក្រាហ្វិក។",
      "skills.ui.label": "រចនាប្លង់ UI",
      "skills.ui.desc": "Spacing ស្អាត ប្លង់កាត hierarchy និង components ឆបគ្នា។",
      "skills.clean.label": "រចនាសម្ព័ន្ធកូដស្អាត",
      "skills.clean.desc": "ថតឯកសាររៀបចំល្អ ផ្នែកប្រើឡើងវិញ និងគម្រោងងាយថែទាំ។",
      "skills.solve.label": "ដោះស្រាយបញ្ហា",
      "skills.solve.desc": "បំបែកបញ្ហាពិតទៅជាដំណោះស្រាយបច្ចេកទេសជាក់ស្តែង។",
      "skills.plan.label": "ការធ្វើផែនការគម្រោង",
      "skills.plan.desc": "រៀបចំទំព័រ មុខងារ រចនាសម្ព័ន្ធទិន្នន័យ និងលំហូរអភិវឌ្ឍន៍។",
      "skills.write.label": "ការសរសេរបច្ចេកទេស",
      "skills.write.desc": "ពន្យល់គោលបំណងគម្រោង features ជំហាន setup និងលទ្ធផលសិក្សា។",
      "about.hero.lead": "ខ្ញុំមានសមត្ថភាពក្នុងការរចនា និងអភិវឌ្ឍន៍គេហទំព័រដែលស្អាត ដំណើរការរលូនលើគ្រប់ឧបករណ៍ (Responsive) និងអាចយកទៅប្រើប្រាស់ក្នុងជាក់ស្តែង ចាប់តាំងពីផ្នែកខាងមុខ (Frontend) រហូតដល់ប្រព័ន្ធវេបសាយពេញលេញ (Full-Stack) ជាមួយរចនាសម្ព័ន្ធដែលអាចទុកចិត្តបាន និងកូដងាយស្រួលថែទាំ។ បច្ចុប្បន្ន ខ្ញុំកំពុងស្វែងរកឱកាសចុះកម្មសិក្សា (Internship) ដែលខ្ញុំអាចចូលរួមចំណែក ជួយអភិវឌ្ឍក្រុមការងារ បន្តរៀនសូត្រឱ្យបានរហ័ស និងបង្កើតដំណោះស្រាយជាក់ស្តែងសម្រាប់អ្នកប្រើប្រាស់។",
      "experience.openTo.role1": "មុខតំណែងជំនួយការអ្នកអភិវឌ្ឍន៍ Full-Stack (Junior Full-Stack Developer)",
      "experience.openTo.role2": "ការចុះកម្មសិក្សាផ្នែក Frontend (Frontend Developer Internship)",
      "experience.openTo.role3": "គម្រោងអភិវឌ្ឍន៍កម្មវិធីវេបសាយ (Web Application Development Projects)",
      "experience.openTo.role4": "ឱកាសធ្វើការពីចម្ងាយ ឬកូនកាត់ (Remote & Hybrid Opportunities)",
      "experience.openTo.role5": "ការចូលរួមចំណែកក្នុងគម្រោងកូដបើកចំហ (Open Source Collaboration)",
      "home.startConversation": "តោះចាប់ផ្តើមការសន្ទនា",
      "home.emailMe": "ផ្ញើអ៊ីមែលមកខ្ញុំ",
      "home.stat.projects1": "គម្រោង",
      "home.stat.projects2": "បានបញ្ចប់",
      "home.stat.months1": "ខែ",
      "home.stat.months2": "រៀនសូត្រ និងអនុវត្ត",
      "home.stat.years1": "ឆ្នាំ",
      "home.stat.years2": "បទពិសោធន៍អនុវត្តជាក់ស្តែង",
      "about.title1": "អំពី",
      "about.title2": "ខ្ញុំ",
      "about.who.title1": "តើខ្ញុំជា",
      "about.who.title2": "នរណា",
      "about.what.title1": "អ្វីដែល",
      "about.what.title2": "ខ្ញុំធ្វើ",
      "about.highlights.title1": "ចំណុច",
      "about.highlights.title2": "ពិសេសរបស់ខ្ញុំ",
      "about.tools.title1": "ឧបករណ៍ និង",
      "about.tools.title2": "បច្ចេកវិទ្យារបស់ខ្ញុំ",
      "about.values.title1": "គុណតម្លៃការងារ",
      "about.values.title2": "របស់ខ្ញុំ",
      "about.quick.role": "តួនាទី៖ និស្សិតបច្ចេកវិទ្យាព័ត៌មាន និងអ្នកអភិវឌ្ឍន៍វេបសាយ Full-Stack ដែលមានមហិច្ឆតា",
      "about.quick.location": "ទីតាំង៖ ភ្នំពេញ កម្ពុជា",
      "about.quick.study": "ការសិក្សា៖ និស្សិតបច្ចេកវិទ្យាព័ត៌មាន",
      "about.quick.focus": "គោលដៅ៖ ការអភិវឌ្ឍន៍វេបសាយទាន់សម័យ និងគុណភាព UI",
      "about.values.item1": "កូដស្អាត និងការរៀបចំមានលក្ខណៈជាប្រព័ន្ធ",
      "about.values.item2": "ការរចនាងាយស្រួលប្រើ និងគិតគូរពីភាពងាយស្រួលចូលប្រើ",
      "about.values.item3": "កិច្ចសហការ និងការទំនាក់ទំនងច្បាស់លាស់",
      "about.values.item4": "ការទទួលខុសត្រូវលើការបញ្ជូនការងារ និងគុណភាព",
      "about.values.item5": "គំនិតរីកចម្រើនតាមរយៈការសិក្សាឥតឈប់ឈរ",
      "about.cta.viewProjects": "មើលគម្រោងរបស់ខ្ញុំ",
      "about.cta.contactMe": "ទាក់ទងខ្ញុំ",
      "projects.title1": "គម្រោង",
      "projects.title2": "របស់ខ្ញុំ",
      "blog.title1": "ប្លុករបស់ខ្ញុំ",
      "blog.title2": "សម្រាប់អ្នកអភិវឌ្ឍន៍",
      "edu.title1": "ការសិក្សា",
      "edu.title2": "របស់ខ្ញុំ",
      "edu.stats.title1": "ស្ថិតិ",
      "edu.stats.title2": "សិក្សា",
      "edu.timeline.title1": "កាលវិភាគ",
      "edu.timeline.title2": "ការសិក្សា",
      "exp.title1": "បទពិសោធន៍",
      "exp.title2": "របស់ខ្ញុំ",
      "exp.careerFocus.title": "ទិសដៅអាជីព",
      "exp.careerFocus.text": "បច្ចុប្បន្ន ខ្ញុំកំពុងកសាងបទពិសោធន៍វិជ្ជាជីវៈក្នុងផ្នែកប្រតិបត្តិការទិន្នន័យ ព្រមទាំងអភិវឌ្ឍជំនាញផ្នែកអភិវឌ្ឍន៍វេបសាយ Full-Stack បច្ចេកវិទ្យាវេបសាយទាន់សម័យ និងការអនុវត្តល្អបំផុតក្នុងវិស្វកម្មសូហ្វវែរ។",
      "exp.coreStrengths.title": "ចំណុចខ្លាំង",
      "exp.chip.responsive": "ការអភិវឌ្ឍន៍ UI ឆ្លើយតបល្អ",
      "exp.chip.cleanCode": "រចនាសម្ព័ន្ធកូដស្អាត",
      "exp.chip.component": "គិតបែបសមាសធាតុ (Component)",
      "exp.chip.git": "លំហូរការងារ Git",
      "exp.openTo.title": "បើកចំហសម្រាប់",
      "contact.title1": "ទាក់ទង",
      "contact.title2": "មកខ្ញុំ",
      "privacy.title1": "គោលការណ៍",
      "privacy.title2": "ឯកជនភាព",
      "privacy.subtitle": "គោលការណ៍នេះពន្យល់ពីព័ត៌មានដែលវេបសាយ portfolio នេះប្រមូល របៀបប្រើប្រាស់វា និងជម្រើសដែលអ្នកមាន — សរសេរជាភាសាសាមញ្ញ ដោយគ្មានការប្រមូលទិន្នន័យលាក់កំបាំងឡើយ។",
      "privacy.updated": "ធ្វើបច្ចុប្បន្នភាពចុងក្រោយ៖ 25 កក្កដា 2026",
      "privacy.toc.title": "នៅក្នុងទំព័រនេះ",
      "privacy.toc.aria": "តារាងមាតិកា",
      "privacy.toc.overview": "ទិដ្ឋភាពទូទៅ",
      "privacy.toc.collect": "ព័ត៌មានដែលយើងប្រមូល",
      "privacy.toc.cookies": "Cookies និងការផ្ទុកក្នុងកម្មវិធីរុករក",
      "privacy.toc.use": "របៀបយើងប្រើប្រាស់ព័ត៌មាន",
      "privacy.toc.thirdParty": "សេវាកម្មភាគីទីបី",
      "privacy.toc.sharing": "ការចែករំលែកទិន្នន័យ",
      "privacy.toc.retention": "រយៈពេលរក្សាទុកទិន្នន័យ",
      "privacy.toc.rights": "សិទ្ធិ និងជម្រើសរបស់អ្នក",
      "privacy.toc.children": "ឯកជនភាពរបស់កុមារ",
      "privacy.toc.links": "តំណភ្ជាប់ខាងក្រៅ",
      "privacy.toc.changes": "ការកែប្រែគោលការណ៍នេះ",
      "privacy.toc.contact": "ទំនាក់ទំនង",
      "privacy.s1.title": "1. ទិដ្ឋភាពទូទៅ",
      "privacy.s1.body": "គោលការណ៍ឯកជនភាពនេះអនុវត្តលើ <strong>pichchanthorn.me</strong> („វេបសាយ“) ដែលជា portfolio ផ្ទាល់ខ្លួន បង្កើត និងថែទាំដោយ Pich Chanthorn ដើម្បីបង្ហាញគម្រោង ជំនាញ និងប្រវត្តិវិជ្ជាជីវៈ។ វេបសាយនេះជាវេបសាយ static ដែលមានទម្រង់ទំនាក់ទំនង — វាមិនតម្រូវឲ្យបង្កើតគណនី មិនដំណើរការការទូទាត់ប្រាក់ និងមិនលក់ទិន្នន័យផ្ទាល់ខ្លួនឡើយ។ គោលការណ៍នេះពណ៌នាពីទិន្នន័យមានកម្រិតដែលវេបសាយប្រមូល និងមូលហេតុ។",
      "privacy.s2.title": "2. ព័ត៌មានដែលយើងប្រមូល",
      "privacy.s2.h3a": "ព័ត៌មានដែលអ្នកផ្តល់ដោយផ្ទាល់",
      "privacy.s2.p1": "នៅពេលអ្នកផ្ញើ<a href='contact.html'>ទម្រង់ទំនាក់ទំនង</a> ព័ត៌មានខាងក្រោមនឹងត្រូវផ្ញើតាម EmailJS ទៅកាន់អ៊ីមែលរបស់ម្ចាស់វេបសាយ៖",
      "privacy.s2.li1": "<strong>ឈ្មោះ</strong> — ដើម្បីអាចឆ្លើយតបទៅអ្នកបានត្រឹមត្រូវ។",
      "privacy.s2.li2": "<strong>អាសយដ្ឋានអ៊ីមែល</strong> — ដើម្បីអាចផ្ញើការឆ្លើយតបត្រឡប់ទៅអ្នក។",
      "privacy.s2.li3": "<strong>ខ្លឹមសារសារ</strong> — អ្វីដែលអ្នកជ្រើសរើសសរសេរ។",
      "privacy.s2.h3b": "ព័ត៌មានដែលប្រមូលដោយស្វ័យប្រវត្តិ",
      "privacy.s2.p2": "វេបសាយប្រើ <strong>Google Analytics</strong> ដើម្បីយល់ពីរបៀបដែលអ្នកចូលមើលប្រើប្រាស់វេបសាយ (ឧ. ទំព័រណាត្រូវបានមើល និងរយៈពេលនៃការចូលមើល)។ ព័ត៌មាននេះអាចរួមមាន៖",
      "privacy.s2.li4": "ទំព័រដែលបានចូលមើល និងរយៈពេលនៅលើវេបសាយ",
      "privacy.s2.li5": "ទីតាំងប្រហាក់ប្រហែល (ទទួលបានពីអាសយដ្ឋាន IP មិនមែន GPS ជាក់លាក់ទេ)",
      "privacy.s2.li6": "ប្រភេទកម្មវិធីរុករក ប្រភេទឧបករណ៍ និងប្រព័ន្ធប្រតិបត្តិការ",
      "privacy.s2.li7": "វេបសាយបញ្ជូនត ឬពាក្យស្វែងរកដែលនាំអ្នកមកទីនេះ",
      "privacy.s2.p3": "ទិន្នន័យនេះត្រូវបានបូកសរុប និងលាក់អត្តសញ្ញាណដោយ Google Analytics។ វាមិនត្រូវបានប្រើដើម្បីកំណត់អត្តសញ្ញាណអ្នកចូលមើលម្នាក់ៗឡើយ។",
      "privacy.s3.title": "3. Cookies និងការផ្ទុកក្នុងកម្មវិធីរុករក",
      "privacy.s3.p1": "Google Analytics បញ្ចូល cookies ភាគីទីមួយ (ដូចជា <code>_ga</code>) ដើម្បីបែងចែកអ្នកចូលមើលផ្សេងៗគ្នា។ អ្នកអាចទប់ស្កាត់ ឬលុបវាបានគ្រប់ពេលតាមការកំណត់កម្មវិធីរុករករបស់អ្នក។",
      "privacy.s3.p2": "ដោយឡែក វេបសាយប្រើ <strong>local storage</strong> របស់កម្មវិធីរុករក — មិនមែន cookies ទេ — ដើម្បីចងចាំការកំណត់ពីរនៅលើឧបករណ៍របស់អ្នកតែប៉ុណ្ណោះ៖ ពណ៌ផ្ទាំងដែលអ្នកជ្រើសរើស (<code>portfolio_theme</code>) និងភាសា (<code>portfolio_language</code>)។ ព័ត៌មាននេះមិនដែលចេញពីកម្មវិធីរុករករបស់អ្នក និងមិនត្រូវបានផ្ញើទៅ server ណាមួយឡើយ។",
      "privacy.s4.title": "4. របៀបយើងប្រើប្រាស់ព័ត៌មាន",
      "privacy.s4.li1": "ដើម្បីឆ្លើយតបសារដែលផ្ញើមកតាមទម្រង់ទំនាក់ទំនង។",
      "privacy.s4.li2": "ដើម្បីយល់ថាខ្លឹមសារណាដែលអ្នកចូលមើលឃើញថាមានប្រយោជន៍ ហើយកែលម្អវេបសាយតាមនោះ។",
      "privacy.s4.li3": "ដើម្បីចងចាំការកំណត់ការបង្ហាញរបស់អ្នក (ផ្ទាំង និងភាសា) រវាងការចូលមើលម្តងៗ។",
      "privacy.s4.li4": "ដើម្បីរក្សាសុវត្ថិភាព និងដំណើរការត្រឹមត្រូវនៃវេបសាយ។",
      "privacy.s4.p1": "ព័ត៌មានមិនដែលត្រូវបានប្រើសម្រាប់ការផ្សាយពាណិជ្ជកម្ម ការវិភាគប្រវត្តិរូប ឬលក់បន្តទៅភាគីទីបីឡើយ។",
      "privacy.s5.title": "5. សេវាកម្មភាគីទីបី",
      "privacy.s5.p1": "វេបសាយពឹងផ្អែកលើសេវាកម្មភាគីទីបីខាងក្រោម ដែលនីមួយៗគ្រប់គ្រងដោយគោលការណ៍ឯកជនភាពរបស់ខ្លួន៖",
      "privacy.s5.li1": "<strong>Google Analytics</strong> — វិភាគចរាចរណ៍ និងការប្រើប្រាស់របស់អ្នកចូលមើល។",
      "privacy.s5.li2": "<strong>EmailJS</strong> — បញ្ជូនទម្រង់ទំនាក់ទំនងតាមអ៊ីមែល ដោយមិនត្រូវការ server backend ដោយឡែក។",
      "privacy.s5.li3": "<strong>GitHub Pages</strong> — ផ្ទុក និងបម្រើវេបសាយ static នេះ។",
      "privacy.s5.li4": "<strong>unpkg និង jsDelivr (CDNs)</strong> — បញ្ជូនបណ្ណាល័យរូបតំណាង Lucide និងឯកសារ script EmailJS។",
      "privacy.s5.p2": "អ្នកផ្តល់សេវាទាំងនេះអាចកត់ត្រាទិន្នន័យបច្ចេកទេសស្តង់ដារ (ដូចជាអាសយដ្ឋាន IP) ជាផ្នែកនៃការផ្តល់សេវារបស់ពួកគេ ដោយឯករាជ្យពីវេបសាយនេះ។",
      "privacy.s6.title": "6. ការចែករំលែក និងការបញ្ចេញទិន្នន័យ",
      "privacy.s6.p1": "គ្មានទិន្នន័យផ្ទាល់ខ្លួនត្រូវបានលក់ ឬជួលឡើយ។ ព័ត៌មានត្រូវបានចែករំលែកតែជាមួយអ្នកផ្តល់សេវាដែលបានរាយខាងលើ ក្នុងគោលបំណងដំណើរការវេបសាយតែប៉ុណ្ណោះ ឬក្នុងករណីដែលច្បាប់តម្រូវឲ្យបញ្ចេញ។",
      "privacy.s7.title": "7. រយៈពេលរក្សាទុកទិន្នន័យ",
      "privacy.s7.p1": "សារពីទម្រង់ទំនាក់ទំនងត្រូវរក្សាទុកក្នុងអ៊ីមែលរបស់ម្ចាស់វេបសាយ តែក្នុងរយៈពេលដែលចាំបាច់សម្រាប់ការឆ្លើយតប និងរក្សាកំណត់ត្រាការទំនាក់ទំនង។ ទិន្នន័យវិភាគត្រូវរក្សាទុកតាមការកំណត់លំនាំដើមរបស់ Google Analytics។ ការកំណត់ក្នុង local storage នៅរហូតដល់អ្នកលុបទិន្នន័យកម្មវិធីរុករករបស់អ្នក។",
      "privacy.s8.title": "8. សិទ្ធិ និងជម្រើសរបស់អ្នក",
      "privacy.s8.li1": "<strong>ដកខ្លួនចេញពីការវិភាគ</strong> — ប្រើ extension កម្មវិធីរុករកដូចជា Google Analytics Opt-out Add-on ឬបើក Do Not Track / ទប់ស្កាត់ cookies ភាគីទីបីក្នុងកម្មវិធីរុករករបស់អ្នក។",
      "privacy.s8.li2": "<strong>លុបការកំណត់ក្នុងឧបករណ៍</strong> — លុប local storage ឬទិន្នន័យវេបសាយសម្រាប់ pichchanthorn.me បានគ្រប់ពេល។",
      "privacy.s8.li3": "<strong>ចូលមើល ឬលុបសាររបស់អ្នក</strong> — ផ្ញើអ៊ីមែលទៅអាសយដ្ឋានខាងក្រោម ដើម្បីស្នើសុំលុបសារដែលបានផ្ញើមុននេះ។",
      "privacy.s9.title": "9. ឯកជនភាពរបស់កុមារ",
      "privacy.s9.p1": "វេបសាយនេះជា portfolio វិជ្ជាជីវៈ ហើយមិនផ្តោតលើ ឬប្រើប្រាស់ដោយដឹងខ្លួនដើម្បីប្រមូលព័ត៌មានពីកុមារអាយុក្រោម 13 ឆ្នាំឡើយ។",
      "privacy.s10.title": "10. តំណភ្ជាប់ខាងក្រៅ",
      "privacy.s10.p1": "វេបសាយមានតំណភ្ជាប់ទៅវេទិកាខាងក្រៅដូចជា GitHub, LinkedIn និង Coursera។ គោលការណ៍ឯកជនភាពនេះមិនរាប់បញ្ចូលវេបសាយភាគីទីបីទាំងនោះទេ — សូមពិនិត្យគោលការណ៍ឯកជនភាពរបស់ពួកគេមុនពេលចែករំលែកព័ត៌មានជាមួយពួកគេ។",
      "privacy.s11.title": "11. ការកែប្រែគោលការណ៍នេះ",
      "privacy.s11.p1": "គោលការណ៍នេះអាចត្រូវធ្វើបច្ចុប្បន្នភាពពីពេលមួយទៅពេលមួយ ដើម្បីឆ្លុះបញ្ចាំងការផ្លាស់ប្តូរវេបសាយ ឬបទប្បញ្ញត្តិដែលពាក់ព័ន្ធ។ កាលបរិច្ឆេទ „ធ្វើបច្ចុប្បន្នភាពចុងក្រោយ“ នៅខាងលើទំព័រនេះបង្ហាញការកែប្រែថ្មីបំផុត។",
      "privacy.s12.title": "12. ទំនាក់ទំនង",
      "privacy.s12.p1": "សំណួរអំពីគោលការណ៍ឯកជនភាពនេះ ឬការស្នើសុំចូលមើល ឬលុបទិន្នន័យរបស់អ្នក អាចផ្ញើមកកាន់ <a href='mailto:pich_chanthorn@pp.bbu.edu.kh'>pich_chanthorn@pp.bbu.edu.kh</a>។"
    }
  };

  const AUTO_PHRASE_KM = {
    "Back to Projects": "ត្រឡប់ទៅគម្រោង",
    "About this Project": "អំពីគម្រោងនេះ",
    "Key Features": "មុខងារសំខាន់ៗ",
    "Key Achievements": "សមិទ្ធផលសំខាន់ៗ",
    "Tech Stack": "បច្ចេកវិទ្យា",
    "Project Links": "តំណភ្ជាប់គម្រោង",
    "Other Projects": "គម្រោងផ្សេងៗ",
    "View Source Code": "មើលកូដដើម",
    "Live Demo": "មើល Demo",
    "Built with HTML, CSS & JavaScript": "បង្កើតដោយ HTML, CSS និង JavaScript",
    "Pich Chanthorn. All rights reserved.": "Pich Chanthorn។ រក្សាសិទ្ធិគ្រប់យ៉ាង។",

    "Information Technology Student | Aspiring Full-Stack Web Developer": "និស្សិត IT | អ្នកអភិវឌ្ឍន៍វេបសាយ Full-Stack ដែលមានមហិច្ឆតា",
    "Information Technology Student & Aspiring Full-Stack Web Developer": "និស្សិតបច្ចេកវិទ្យាព័ត៌មាន និងអ្នកអភិវឌ្ឍន៍វេបសាយ Full-Stack ដែលមានមហិច្ឆតា",
    "Building secure, modern, and user-focused web applications": "កសាងកម្មវិធីវេបសាយដែលមានសុវត្ថិភាព ទាន់សម័យ និងផ្តោតលើអ្នកប្រើប្រាស់",
    "I design and build clean, responsive products for real-world use, from frontend interfaces to full-stack web systems with reliable architecture and maintainable code.": "ខ្ញុំរចនា និងបង្កើតផលិតផលដែលស្អាត ដំណើរការល្អលើគ្រប់ឧបករណ៍ សម្រាប់ការប្រើប្រាស់ជាក់ស្តែង ចាប់ពីផ្នែកខាងមុខ (Frontend) រហូតដល់ប្រព័ន្ធវេបសាយពេញលេញ (Full-Stack) ជាមួយរចនាសម្ព័ន្ធដែលអាចទុកចិត្តបាន និងកូដដែលងាយស្រួលថែទាំ។",
    "I am currently seeking internship opportunities where I can contribute, keep learning fast, and deliver practical solutions for teams and users.": "បច្ចុប្បន្ន ខ្ញុំកំពុងស្វែងរកឱកាសចុះកម្មសិក្សា (Internship) ដែលខ្ញុំអាចចូលរួមចំណែក បន្តរៀនសូត្រឱ្យបានរហ័ស និងផ្តល់ដំណោះស្រាយជាក់ស្តែងសម្រាប់ក្រុមការងារ និងអ្នកប្រើប្រាស់។",
    "Internship-ready portfolio": "ផតហ្វូលីយ៉ូដែលត្រៀមខ្លួនសម្រាប់ចុះកម្មសិក្សា",
    "Let's Connect": "តោះទាក់ទងគ្នា",
    "Open to internship and junior developer opportunities": "បើកចំហសម្រាប់ឱកាសចុះកម្មសិក្សា និងការងារអ្នកអភិវឌ្ឍន៍កម្រិតដំបូង",
    "If you are hiring or looking for a reliable teammate for web development projects, I would be glad to connect.": "ប្រសិនបើអ្នកកំពុងជ្រើសរើសបុគ្គលិក ឬកំពុងស្វែងរកសមាជិកក្រុមការងារដែលអាចទុកចិត្តបានសម្រាប់គម្រោងអភិវឌ្ឍន៍វេបសាយ ខ្ញុំមានក្តីរីករាយក្នុងការទាក់ទង។",
    "Email": "អ៊ីមែល",
    "Location": "ទីតាំង",
    "Portfolio": "ផតហ្វូលីយ៉ូ",

    "Professional Profile": "ប្រវត្តិរូបវិជ្ជាជីវៈ",
    "My journey in web development started with curiosity and quickly became a long-term goal. I enjoy turning ideas into clear, functional, and visually balanced websites that solve real user problems.": "ដំណើររបស់ខ្ញុំក្នុងការអភិវឌ្ឍន៍វេបសាយបានចាប់ផ្តើមចេញពីភាពចង់ដឹងចង់ឃើញ ហើយបានក្លាយជាគោលដៅរយៈពេលវែងយ៉ាងឆាប់រហ័ស។ ខ្ញុំចូលចិត្តបំប្លែងគំនិតឱ្យទៅជាគេហទំព័រច្បាស់លាស់ ដំណើរការបានល្អ និងមានតុល្យភាព ដែលដោះស្រាយបញ្ហាជាក់ស្តែងរបស់អ្នកប្រើប្រាស់។",
    "As I continue my IT studies, I focus on strengthening both frontend quality and backend fundamentals. My goal is to grow into a professional developer who delivers reliable products for clients, teams, and organizations.": "ខណៈពេលបន្តការសិក្សា IT ខ្ញុំផ្តោតលើការពង្រឹងគុណភាពផ្នែកខាងមុខ (Frontend) និងមូលដ្ឋានគ្រឹះផ្នែកខាងក្រោយ (Backend)។ គោលដៅរបស់ខ្ញុំគឺរីកចម្រើនទៅជាអ្នកអភិវឌ្ឍន៍វិជ្ជាជីវៈ ដែលផ្តល់ផលិតផលអាចទុកចិត្តបានសម្រាប់អតិថិជន ក្រុមការងារ និងអង្គភាព។",
    "Building practical digital solutions with thoughtful design and continuous improvement.": "កសាងដំណោះស្រាយឌីជីថលជាក់ស្តែង ជាមួយការរចនាដ៏ប្រុងប្រយ័ត្ន និងការកែលម្អជាបន្តបន្ទាប់។",
    "Frontend Development": "ការអភិវឌ្ឍន៍ផ្នែកខាងមុខ (Frontend)",
    "Creating clean and interactive interfaces with HTML, CSS, JavaScript, and modern component structure.": "បង្កើតចំណុចប្រទាក់ស្អាត និងអន្តរកម្មល្អដោយប្រើ HTML, CSS, JavaScript និងរចនាសម្ព័ន្ធសមាសធាតុទាន់សម័យ។",
    "UI/UX Design": "ការរចនា UI/UX",
    "Designing user-friendly layouts and visual flows in Figma before implementation.": "រចនាប្លង់ងាយស្រួលប្រើ និងលំហូរដែលមើលឃើញក្នុង Figma មុននឹងអនុវត្តជាក់ស្តែង។",
    "Responsive Websites": "គេហទំព័រឆ្លើយតបល្អ",
    "Building pages that look professional and perform well across desktop, tablet, and mobile devices.": "បង្កើតទំព័រដែលមើលទៅមានលក្ខណៈវិជ្ជាជីវៈ និងដំណើរការល្អលើកុំព្យូទ័រ ថេប្លេត និងទូរស័ព្ទ។",
    "Backend & Database Basics": "មូលដ្ឋានគ្រឹះ Backend និងមូលដ្ឋានទិន្នន័យ",
    "Developing PHP and MySQL features such as forms, CRUD logic, and secure data handling foundations.": "អភិវឌ្ឍមុខងារ PHP និង MySQL ដូចជាទម្រង់បំពេញ តក្កវិជ្ជា CRUD និងមូលដ្ឋានគ្រឹះនៃការគ្រប់គ្រងទិន្នន័យប្រកបដោយសុវត្ថិភាព។",
    "IT Student": "និស្សិត IT",
    "Aspiring Full-Stack Web Developer": "អ្នកអភិវឌ្ឍន៍វេបសាយ Full-Stack ដែលមានមហិច្ឆតា",
    "Teamwork": "ការងារជាក្រុម",
    "Problem Solving": "ការដោះស្រាយបញ្ហា",
    "Continuous Learning": "ការសិក្សាឥតឈប់ឈរ",
    "Project Building": "ការបង្កើតគម្រោង",
    "Frontend": "ផ្នែកខាងមុខ",
    "Backend & Database": "Backend និងមូលដ្ឋានទិន្នន័យ",
    "Workflow & Design": "លំហូរការងារ និងការរចនា",
    "Let's Work Together": "តោះធ្វើការជាមួយគ្នា",
    "Interested in collaboration, freelance work, or project opportunities? Let’s connect.": "ចាប់អារម្មណ៍ចង់សហការ ធ្វើការងារឯករាជ្យ ឬឱកាសគម្រោង? តោះទាក់ទងគ្នា។",

    "Here are the technologies, tools, and AI skills I use to build modern web applications.": "នេះជាបច្ចេកវិទ្យា ឧបករណ៍ និងជំនាញ AI ដែលខ្ញុំប្រើដើម្បីបង្កើតកម្មវិធីវេបសាយទាន់សម័យ។",

    "A curated selection of practical web projects with production-focused implementation, responsive UX, and clean code practices for real-world use.": "នេះជាការជ្រើសរើសគម្រោងវេបសាយជាក់ស្តែង ដែលផ្តោតលើការអនុវត្តន៍ថ្នាក់ផលិតកម្ម បទពិសោធន៍អ្នកប្រើប្រាស់ល្អ (UX) និងការសរសេរកូដស្អាតសម្រាប់ការប្រើប្រាស់ជាក់ស្តែង។",

    "View Certificate": "មើលវិញ្ញាបនបត្រ",

    "Send a Message": "ផ្ញើសារមកខ្ញុំ",
    "Ready to collaborate? Share your project, role, or internship details.": "ត្រៀមខ្លួនសហការហើយឬនៅ? ចែករំលែកព័ត៌មានអំពីគម្រោង តួនាទី ឬការចុះកម្មសិក្សារបស់អ្នក។",
    "Your Name": "ឈ្មោះរបស់អ្នក",
    "Email Address": "អាសយដ្ឋានអ៊ីមែល",
    "Your Message": "សាររបស់អ្នក",
    "Enter your full name": "បញ្ចូលឈ្មោះពេញរបស់អ្នក",
    "Write your message...": "សរសេរសាររបស់អ្នក...",
    "Send Message": "ផ្ញើសារ",
    "PREFERRED CHANNELS": "ឆានែលដែលពេញចិត្ត",
    "Open to internship and collaboration opportunities.": "បើកចំហសម្រាប់ការចុះកម្មសិក្សា និងឱកាសសហការ។",

    "Overall GPA": "GPA សរុប",
    "Current Year": "ឆ្នាំបច្ចុប្បន្ន",
    "Credits Completed": "ក្រេឌីតបានបញ្ចប់",
    "Semesters Done": "ឆមាសបានបញ្ចប់",
    "A practice-oriented curriculum focused on web application development, database systems, computer networking, algorithms, and UI/UX fundamentals with continuous project-based learning.": "កម្មវិធីសិក្សាផ្តោតលើការអនុវត្តជាក់ស្តែង ក្នុងការអភិវឌ្ឍន៍កម្មវិធីវេបសាយ ប្រព័ន្ធមូលដ្ឋានទិន្នន័យ បណ្តាញកុំព្យូទ័រ អាល់ហ្គូរីត និងមូលដ្ឋានគ្រឹះ UI/UX ជាមួយការសិក្សាផ្អែកលើគម្រោងជាបន្តបន្ទាប់។",
    "View Official Academic Results": "មើលលទ្ធផលសិក្សាផ្លូវការ",
    "Academic Note": "កំណត់សម្គាល់សិក្សា",
    "Two course results are currently pending official verification by Build Bright University. Results marked as \"Pending Verification\" are temporary placeholders and will be updated once the university officially releases the final grades.": "លទ្ធផលមុខវិជ្ជាចំនួនពីរបច្ចុប្បន្នកំពុងរង់ចាំការផ្ទៀងផ្ទាត់ជាផ្លូវការពីសាកលវិទ្យាល័យ Build Bright University។ លទ្ធផលដែលសម្គាល់ថា \"កំពុងរង់ចាំផ្ទៀងផ្ទាត់\" គឺជាតម្លៃបណ្តោះអាសន្ន ហើយនឹងត្រូវបានធ្វើបច្ចុប្បន្នភាពនៅពេលសាកលវិទ្យាល័យប្រកាសពិន្ទុចុងក្រោយជាផ្លូវការ។"
  };

  // Expose translations globally for other modules
  window.__i18n = {
    TRANSLATIONS,
    I18N_STORAGE_KEY,
    getCurrentLanguage
  };

  function normalizeWhitespace(text) {
    return String(text || "").replace(/\s+/g, " ").trim();
  }

  function slugify(value) {
    return normalizeWhitespace(value)
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9\s.-]/g, "")
      .replace(/[\s.]+/g, "_")
      .replace(/^_+|_+$/g, "")
      .slice(0, 80) || "text";
  }

  function getCurrentLanguage() {
    const saved = localStorage.getItem(I18N_STORAGE_KEY);
    return saved && TRANSLATIONS[saved] ? saved : "en";
  }

  function setI18nAttribute(element, key) {
    if (!element || !key) return;
    element.setAttribute("data-i18n", key);
  }

  function setI18nPlaceholderAttribute(element, key) {
    if (!element || !key) return;
    element.setAttribute("data-i18n-placeholder", key);
  }

  function setI18nAriaLabelAttribute(element, key) {
    if (!element || !key) return;
    element.setAttribute("data-i18n-aria-label", key);
  }

  function setI18nTitleAttribute(element, key) {
    if (!element || !key) return;
    element.setAttribute("data-i18n-title", key);
  }

  function inferKhmerTranslation(text) {
    const normalized = normalizeWhitespace(text);
    if (!normalized) return "";
    // Only ever return a full, hand-written Khmer phrase. Never do a
    // word-by-word swap here — that produces mixed-language sentences.
    // Anything without a real translation below stays in clean English
    // until a proper Khmer phrase is added to AUTO_PHRASE_KM.
    return AUTO_PHRASE_KM[normalized] || normalized;
  }

  function ensureTranslationEntry(key, englishValue) {
    if (!key || !englishValue) return;

    if (!TRANSLATIONS.en[key]) {
      TRANSLATIONS.en[key] = englishValue;
    }

    if (!TRANSLATIONS.km[key]) {
      TRANSLATIONS.km[key] = inferKhmerTranslation(englishValue);
    }
  }

  function buildAutoKey(prefix, textValue) {
    const page = location.pathname.split("/").pop()?.replace(".html", "") || "page";
    return `auto.${page}.${prefix}.${slugify(textValue)}`;
  }

  function bindAutoTextNodes() {
    document.querySelectorAll(AUTO_TEXT_SELECTOR).forEach(element => {
      if (element.hasAttribute("data-i18n") || element.hasAttribute("data-i18n-html")) return;
      // Mirrors the guard in translatePage: anything wrapping inline markup is
      // handled by an explicit key, so auto-binding it would only add dead keys.
      if (element.children.length > 0) return;

      const text = normalizeWhitespace(element.textContent);
      if (!text) return;

      const key = buildAutoKey("text", text);
      setI18nAttribute(element, key);
      ensureTranslationEntry(key, text);
    });
  }

  function bindAutoAttributes() {
    document.querySelectorAll("[placeholder]").forEach(element => {
      if (element.hasAttribute("data-i18n-placeholder")) return;
      const value = normalizeWhitespace(element.getAttribute("placeholder"));
      if (!value) return;
      const key = buildAutoKey("placeholder", value);
      setI18nPlaceholderAttribute(element, key);
      ensureTranslationEntry(key, value);
    });

    document.querySelectorAll("[aria-label]").forEach(element => {
      if (element.hasAttribute("data-i18n-aria-label")) return;
      const value = normalizeWhitespace(element.getAttribute("aria-label"));
      if (!value) return;
      const key = buildAutoKey("aria", value);
      setI18nAriaLabelAttribute(element, key);
      ensureTranslationEntry(key, value);
    });

    document.querySelectorAll("[title]").forEach(element => {
      if (element.hasAttribute("data-i18n-title")) return;
      const value = normalizeWhitespace(element.getAttribute("title"));
      if (!value) return;
      const key = buildAutoKey("title", value);
      setI18nTitleAttribute(element, key);
      ensureTranslationEntry(key, value);
    });
  }

  function attachI18nAttributes(dom) {
    setI18nAriaLabelAttribute(dom.menuButton, "menu.toggle");
    setI18nAriaLabelAttribute(dom.mainNav, "nav.main");

    const navKeyMap = {
      "nav.home": "Home",
      "nav.about": "About",
      "nav.skills": "Skills",
      "nav.projects": "Projects",
      "nav.certificates": "Certificates",
      "nav.education": "Education",
      "nav.experience": "Experience",
      "nav.contact": "Contact"
    };

    document.querySelectorAll(".nav a span").forEach(span => {
      const text = normalizeWhitespace(span.textContent);
      for (const [key, label] of Object.entries(navKeyMap)) {
        if (text === label) {
          setI18nAttribute(span, key);
          break;
        }
      }
    });

    const roleElement = document.querySelector(".role");
    if (roleElement) {
      const roleText = normalizeWhitespace(roleElement.textContent);
      setI18nAttribute(roleElement, roleText.includes("IT Student") ? "role.student" : "role.fullstack");
    }

    setI18nAttribute(document.querySelector(".hero-subtitle"), "home.welcome");
    setI18nAttribute(document.querySelector(".hero-buttons .btn.primary span"), "home.cta.projects");
    setI18nAttribute(document.querySelector(".hero-buttons .btn.outline span"), "home.cta.cv");
    setI18nAttribute(document.querySelector(".hero-buttons .btn.ghost span"), "home.cta.contactMe");

    setI18nAttribute(document.querySelector(".contact-page .subtitle"), "contact.subtitle");
    const contactLabels = [...document.querySelectorAll(".contact-card .contact-label")];
    setI18nAttribute(contactLabels[0], "contact.email");
    setI18nAttribute(contactLabels[1], "contact.phone");
    setI18nAttribute(contactLabels[2], "contact.location");

    setI18nAttribute(document.querySelector(".form-title"), "contact.form.title");

    const formGroups = [...document.querySelectorAll(".contact-form .form-group")];
    setI18nAttribute(formGroups[0]?.querySelector("label"), "contact.form.name");
    setI18nAttribute(formGroups[1]?.querySelector("label"), "contact.form.email");
    setI18nAttribute(formGroups[2]?.querySelector("label"), "contact.form.message");

    setI18nPlaceholderAttribute(document.getElementById("name"), "contact.form.placeholder.name");
    setI18nPlaceholderAttribute(document.getElementById("email"), "contact.form.placeholder.email");
    setI18nPlaceholderAttribute(document.getElementById("message"), "contact.form.placeholder.message");

    setI18nAttribute(dom.sendButton?.querySelector("span"), "contact.form.submit");

    setI18nAttribute(document.querySelector(".breadcrumb-link span"), "projects.back");
    document.querySelectorAll(".project-section .section-title").forEach(title => {
      const label = normalizeWhitespace(title.textContent);
      if (label.includes("About")) setI18nAttribute(title, "projects.about");
      if (label.includes("Features")) setI18nAttribute(title, "projects.features");
    });
    document.querySelectorAll(".project-section .section-title-sm").forEach(title => {
      const label = normalizeWhitespace(title.textContent);
      if (label.includes("Achievements")) setI18nAttribute(title, "projects.achievements");
    });

    document.querySelectorAll(".sidebar-title").forEach(title => {
      const value = normalizeWhitespace(title.textContent);
      if (value.includes("Tech Stack")) setI18nAttribute(title, "projects.techStack");
      if (value.includes("Project Links")) setI18nAttribute(title, "projects.links");
      if (value.includes("Other Projects")) setI18nAttribute(title, "projects.other");
    });

    document.querySelectorAll(".btn.ghost.full span").forEach(span => {
      if (normalizeWhitespace(span.textContent).includes("Source")) setI18nAttribute(span, "projects.viewCode");
    });
    document.querySelectorAll(".btn.primary.full span").forEach(span => {
      if (normalizeWhitespace(span.textContent).includes("Live")) setI18nAttribute(span, "projects.liveDemo");
    });

    setI18nAttribute(document.querySelector(".text-center h1"), "cv.title");
    setI18nAttribute(document.querySelector(".text-center p"), "cv.subtitle");
    document.querySelectorAll(".cv-card .actions a:first-child").forEach(link => setI18nAttribute(link, "cv.view"));
    document.querySelectorAll(".cv-card .actions a:last-child").forEach(link => setI18nAttribute(link, "cv.download"));

    // Match CV back-home link by text content instead of href
    document.querySelectorAll(".text-center a").forEach(link => {
      const text = normalizeWhitespace(link.textContent);
      if (text.includes("Back to Home")) setI18nAttribute(link, "cv.backHome");
    });

    // The footer line ends in a link on every page, so the label text and the
    // link are tagged separately — tagging the whole <p> would mean translating
    // it wipes out the link.
    document.querySelectorAll(".site-footer p").forEach(element => {
      const link = element.querySelector("a");
      if (!link) {
        setI18nAttribute(element, "footer.built");
        return;
      }

      setI18nAttribute(link, "footer.privacy");

      const leading = element.firstChild;
      if (!leading || leading.nodeType !== Node.TEXT_NODE) return;

      const separatorIndex = leading.textContent.indexOf("·");
      const rawLabel = separatorIndex >= 0
        ? leading.textContent.slice(0, separatorIndex)
        : leading.textContent;
      const label = normalizeWhitespace(rawLabel);
      if (!label) return;

      const labelSpan = document.createElement("span");
      labelSpan.textContent = label;
      setI18nAttribute(labelSpan, "footer.built");

      leading.textContent = separatorIndex >= 0
        ? " " + leading.textContent.slice(separatorIndex)
        : "";
      element.insertBefore(labelSpan, leading);
    });
  }

  function injectLanguageSwitcher(sidebarFooter) {
    if (!sidebarFooter || sidebarFooter.querySelector(".lang-switcher")) return;

    const year = new Date().getFullYear();
    sidebarFooter.innerHTML = `
      <div class="lang-switcher" role="group" data-i18n-aria-label="lang.label">
        <span class="lang-switcher-label" data-i18n="lang.label"></span>
        <div class="lang-switcher-buttons">
          <button type="button" class="lang-btn" data-lang="en" data-i18n="lang.en" title="English"></button>
          <button type="button" class="lang-btn" data-lang="km" data-i18n="lang.km" title="Khmer"></button>
        </div>
      </div>
      <p class="sidebar-copy">© <span id="sidebarYear">${year}</span> Pich Chanthorn</p>
    `;
  }

  function translatePage(language = getCurrentLanguage()) {
    const activeLanguage = TRANSLATIONS[language] ? language : "en";
    const dictionary = TRANSLATIONS[activeLanguage];

    document.documentElement.lang = activeLanguage;

    document.querySelectorAll("[data-i18n]").forEach(element => {
      const key = element.getAttribute("data-i18n");
      if (!key) return;
      // Elements with child elements (links, icons, etc.) are skipped —
      // overwriting textContent would silently delete that nested markup.
      if (element.children.length > 0) return;
      const translated = dictionary[key];
      if (!translated) return;
      if (element.textContent !== translated) element.textContent = translated;
    });

    // Opt-in variant for copy that must keep inline markup (links, <strong>,
    // <code>). Values come only from the hardcoded TRANSLATIONS above — never
    // from user input — so assigning innerHTML here carries no injection risk.
    document.querySelectorAll("[data-i18n-html]").forEach(element => {
      const key = element.getAttribute("data-i18n-html");
      if (!key) return;
      const translated = dictionary[key];
      if (!translated) return;
      if (element.innerHTML !== translated) element.innerHTML = translated;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
      const key = element.getAttribute("data-i18n-placeholder");
      if (!key) return;
      const translated = dictionary[key];
      if (!translated) return;
      if (element.getAttribute("placeholder") !== translated) element.setAttribute("placeholder", translated);
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach(element => {
      const key = element.getAttribute("data-i18n-aria-label");
      if (!key) return;
      const translated = dictionary[key];
      if (!translated) return;
      if (element.getAttribute("aria-label") !== translated) element.setAttribute("aria-label", translated);
    });

    document.querySelectorAll("[data-i18n-title]").forEach(element => {
      const key = element.getAttribute("data-i18n-title");
      if (!key) return;
      const translated = dictionary[key];
      if (!translated) return;
      if (element.getAttribute("title") !== translated) element.setAttribute("title", translated);
    });

    document.querySelectorAll(".lang-btn").forEach(button => {
      const isActive = button.dataset.lang === activeLanguage;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  // Expose translate function globally
  window.__i18n.translatePage = translatePage;

  function initializeLanguage(dom) {
    injectLanguageSwitcher(dom.sidebarFooter);
    attachI18nAttributes(dom);
    bindAutoTextNodes();
    bindAutoAttributes();

    const language = getCurrentLanguage();
    translatePage(language);

    const switcher = document.querySelector(".lang-switcher");
    if (!switcher) return;

    switcher.addEventListener("click", event => {
      const button = event.target.closest(".lang-btn");
      if (!button || !TRANSLATIONS[button.dataset.lang]) return;

      localStorage.setItem(I18N_STORAGE_KEY, button.dataset.lang);
      translatePage(button.dataset.lang);
    });

    switcher.addEventListener("keydown", event => {
      const currentButton = event.target.closest(".lang-btn");
      if (!currentButton) return;

      const buttons = [...switcher.querySelectorAll(".lang-btn")];
      const index = buttons.indexOf(currentButton);
      if (index < 0) return;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        buttons[(index + 1) % buttons.length].focus();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        buttons[(index - 1 + buttons.length) % buttons.length].focus();
      }
    });
  }

  function initializeMobileMenu(dom) {
    const { menuButton, sidebar } = dom;
    if (!menuButton || !sidebar) return;

    menuButton.setAttribute("aria-controls", "sidebar");
    menuButton.setAttribute("aria-expanded", "false");

    const toggleMenu = forceState => {
      const nextState = typeof forceState === "boolean" ? forceState : !sidebar.classList.contains("active");
      sidebar.classList.toggle("active", nextState);
      menuButton.setAttribute("aria-expanded", String(nextState));
    };

    menuButton.addEventListener("click", () => toggleMenu());

    sidebar.addEventListener("click", event => {
      if (!event.target.closest("a")) return;
      toggleMenu(false);
    });

    document.addEventListener("keydown", event => {
      if (event.key !== "Escape" || !sidebar.classList.contains("active")) return;
      toggleMenu(false);
      menuButton.focus();
    });
  }

  // Expose initialization functions
  window.__navigation = {
    initializeMobileMenu,
    initializeLanguage
  };
})();
