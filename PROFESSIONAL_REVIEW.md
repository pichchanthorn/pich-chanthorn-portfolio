# របាយការណ៍ពិនិត្យ Portfolio — pichchanthorn.me

**កាលបរិច្ឆេទពិនិត្យ:** 2026-08-11
**វិសាលភាព:** គ្រប់ទំព័រទាំង 25 (index + 24 pages រួមទាំង project pages 12 និង blog post 1)
**របៀបពិនិត្យ:** អានកូដពិតប្រាកដគ្រប់ទំព័រ (HTML/CSS/JS), ត្រួតពិនិត្យ link ទាំងអស់, ប្រៀបធៀបខ្លឹមសារឆ្លងទំព័រ — មិនមែនគ្រាន់តែមើលផ្ទៃ (visual) ទេ។
**គោលការណ៍:** នេះជា *review report* ប៉ុណ្ណោះ — **មិនទាន់មានការកែកូដណាមួយឡើយ**។ អ្នកជ្រើសរើសថាចង់ដោះស្រាយចំណុចណាមុន ហើយសុំឲ្យខ្ញុំជួយ implement ជាជំហានៗម្តងមួយៗ។

---

## របៀបអាន

- 🔴 **High** = បញ្ហាដែលធ្វើឲ្យ hiring manager សម្គាល់ភ្លាមៗ ថាមិន professional ឬបញ្ហា broken ពិតប្រាកដ — គួរដោះស្រាយមុនគេ
- 🟡 **Medium** = មិនធ្វើឲ្យខូចមុខមុខទាំងស្រុង ប៉ុន្តែជា inconsistency/gap ដែល developer ដែលមានបទពិសោធន៍នឹងសម្គាល់ឃើញ
- 🟢 **Low** = ការកែលម្អបន្ថែម (polish) — ល្អប្រសើរបើមានពេល ប៉ុន្តែមិនបន្ទាន់
- ✅ = **ល្អរួចហើយ កុំកែ**

---

## 🔴 High Priority

### 1. ឈ្មោះខ្លួនឯងសរសេរខុសនៅលើទំព័រ CV
**កន្លែង:** `pages/cv.html` line 60 — `<h1>Pich Chan Thorn</h1>`

នេះជា heading ធំបំផុត ដែលអ្នកមើលឃើញមុនគេនៅលើទំព័រ CV — តែសរសេរជា "Chan Thorn" (ដកឃ្លា 2) ខណៈពេលដែលគ្រប់ទីកន្លែងផ្សេងទៀតទាំងអស់ក្នុង site (title tag, JSON-LD, គ្រប់ទំព័រផ្សេង) សរសេរ "Chanthorn" ដូចគ្នា។ CV គឺជាឯកសារដែល hiring manager ទំនងជា download ហើយបញ្ជូនបន្តទៅមិត្តរួមការងារ — ការសរសេរខុសឈ្មោះខ្លួនឯងលើ document នេះមើលទៅមិនល្អខ្លាំង។ **កែងាយបំផុតតែប៉ះពាល់ខ្លាំងបំផុត។**

### 2. ព័ត៌មាន Project នៅលើ CV មិនត្រូវនឹង Project ពិតប្រាកដ
**កន្លែង:** `pages/cv.html` lines 207-223, section "Selected Projects"

CV រាយ project ចំនួន 3៖ *"Task Management System"*, *"E-Commerce Website"*, *"Student Management System"* — ជាឈ្មោះទូទៅមិនច្បាស់លាស់។ ប៉ុន្តែនៅលើទំព័រ Projects ពិតប្រាកដ (12 projects) មិនមាន project ណាមួយឈ្មោះដូចនេះទាល់តែសោះ (មានតែ "Smart Admin Dashboard", "PCTN Fertilizer Shop", "Simple User Manager"...)។ ប្រសិនបើ hiring manager បើក CV ជាមួយ portfolio site ក្នុងពេលតែមួយ គាត់នឹងសម្គាល់ភ្លាមថា project ទាំងនេះ "មិនត្រូវគ្នា" — មើលទៅដូចជា placeholder text ដែលភ្លេចកែឲ្យត្រូវនឹង project ពិតប្រាកដ។ នេះជាការខូចទំនុកចិត្ត (credibility) ធ្ងន់ធ្ងរបំផុតមួយដែលរកឃើញ។

**ដំណោះស្រាយ:** ជំនួសដោយ project ពិតប្រាកដ 3 ដែលចង់បង្ហាញបំផុត (ឧ. Smart Admin Dashboard, PCTN Fertilizer Shop, Daily Tracker) ព្រមទាំងសង្ខេបខ្លីត្រឹមត្រូវ។

### 3. ឈ្មោះក្រុមហ៊ុនកន្លែងធ្វើការមិនដូចគ្នារវាងទំព័រ
**កន្លែង:** `pages/experience.html` (lines 149, 191) ហៅថា **"Haystack Labs"** ខណៈ `pages/cv.html` (lines 122, 135) ហៅថា **"Haystack Solutions"** — ទាំងពីរភ្ជាប់ទៅ domain ដូចគ្នា `haystack-solutions.com`។ Hiring manager ដែលធ្វើ background check លើកន្លែងធ្វើការនឹងសម្គាល់ឃើញភ្លាមថាឈ្មោះមិនត្រូវគ្នា។ ត្រូវជ្រើសយកឈ្មោះមួយឲ្យប្រើឲ្យដូចគ្នាទាំងអស់ (ដូច domain គឺ "Haystack Solutions" ទំនងជាត្រឹមត្រូវជាង)។

### 4. "Founder & CEO of PCTN" លេចឡើងតែក្នុង CV/JSON-LD ប៉ុន្តែអត់មាននៅ Experience page
**កន្លែង:** `pages/cv.html` lines 145-157 មាន "Founder & CEO... PCTN... January 2020 – Present" ច្បាស់លាស់ ព្រមទាំង JSON-LD លើស្ទើរគ្រប់ទំព័រដាក់ `"hasOccupation": [..., {"name": "Founder"}]` — ប៉ុន្តែទំព័រ **Experience** ដែលមនុស្សអានផ្ទាល់ភ្នែក (មិនមែន JSON-LD) មិនដែលលើកឡើងអំពី PCTN ទាល់តែសោះ — គ្មាន timeline entry, គ្មាន link ផ្ទៀងផ្ទាត់។ ការអះអាងថាជា "CEO" អស់រយៈពេល 6 ឆ្នាំ ដោយគ្មានភស្តុតាងណាមួយបញ្ជាក់ បង្ហាញថាទំព័រនេះមិនទាន់សម្រេច ឬមិនស៊ីគ្នា។ **ត្រូវបន្ថែម PCTN ជា timeline entry នៅ Experience page ដោយផ្ទាល់ ព្រមទាំង link ទៅ PCTN (ប្រសិនបើមាន website/social) ដើម្បីអោយមានភស្តុតាង។**

### 5. Copyright year ចាស់ (stale) នៅស្ទើរគ្រប់ទំព័រ — Bug ដដែលៗពេញ site
**កន្លែង:** សម្គាល់ដោយ agent ទាំង 3 ព្រមទាំងផ្ទាល់ខ្លួន — នេះជា bug ធំបំផុតមួយព្រោះលេចឡើងស្ទើរគ្រប់ទំព័រ។

- `index.html` sidebar footer ប្រើ `<span id="currentYear"></span>` ដែល JS (main.js) update ជាស្វ័យប្រវត្តិ → **ត្រឹមត្រូវ**
- ប៉ុន្តែស្ទើរគ្រប់ទំព័រផ្សេងទៀត (about, skills, education, experience, contact, privacy-policy, certificates, projects.html, និង project detail pages ទាំង 12) sidebar footer សរសេរ **hardcode ជាអក្សរធម្មតា** ថា "© 2025 Pich Chanthorn" ដោយគ្មាន `id="currentYear"` — ធ្វើឲ្យ JS logic (`main.js:374`, ស្វែងរក id `"currentYear"`, `"currentYearFooter"`, `"sidebarYear"`) រកមិនឃើញ element ទាំងនេះ ដូច្នេះមិន update ទេ
- `about.html` សរសេរ hardcode ថា "© 2026" (ត្រូវសំណាងសម្រាប់ពេលនេះ តែនឹងចាស់វិញនៅឆ្នាំក្រោយ)
- លទ្ធផល៖ **ថ្ងៃនេះ (2026)** hiring manager ដែលចូលមើលទំព័រណាមួយក្រៅពី homepage នឹងឃើញ "© 2025" — ដូចជា site ត្រូវបានបោះបង់ចោល

**ដំណោះស្រាយ:** ជំនួស static text "© 2025 Pich Chanthorn" ក្នុង sidebar footer ទាំងអស់ដោយ `<span id="currentYear"></span>` ដូច index.html — កែម្តងគ្រប់ 23 ឯកសារ។

### 6. Blog card ចំនួន 3 មិនអាច click បាន — ភ្ជាប់ទៅកន្លែងណាមួយសោះ
**កន្លែង:** `pages/blog.html`

Card ដំបូងទាំង 3 (រួមទាំង card "featured" ដែលលេចធ្លោបំផុត — "Automating Backup and Recovery in Linux Environment", "Securing Web Applications Against SQL Injection", "Optimizing Complex Queries...in Oracle") គ្មាន `<a href>` ទាល់តែសោះ — ជា `<article>` ធម្មតា។ អត្ថបទទាំងនេះ **មិនមានពិតប្រាកដ**ក្នុង repo ទេ។ អ្នកចូលមើល (ឬ hiring manager) click លើ card ដែលលេចធ្លោបំផុត ហើយគ្មានអ្វីកើតឡើង — មើលទៅដូចជា broken feature ជាជាង "coming soon"។

**ដំណោះស្រាយ:** សរសេរអត្ថបទទាំង 3 ជាក់ស្តែង ឬដកចេញ ឬដាក់ស្លាក "Coming soon" ច្បាស់លាស់ដោយមិនធ្វើជា card ដែលមើលទៅដូច clickable។

### 7. Favicon មានតែលើ Homepage មួយប៉ុណ្ណោះ (24/25 ទំព័រគ្មាន)
**កន្លែង:** មានតែ `index.html` ប៉ុណ្ណោះមាន `<link rel="icon">` — ទំព័រផ្សេងទាំង 24 គ្មាន tag នេះទាល់តែសោះ។ មានន័យថា browser tab នៅលើទំព័រណាមួយក្រៅពី homepage នឹងបង្ហាញ icon ទទេ ឬ default icon។ បន្ថែមពីនេះ `type="image/x-icon"` ខុសទៀត (ព្រោះ file ជា `.png` មិនមែន `.ico`) ហើយ favicon ប្រើរូបថតពេញមុខ (profile photo) ដែលនៅទំហំតូច (16-32px) នឹងព្រិលមើលមិនច្បាស់។ គ្មាន `apple-touch-icon` ឬ `manifest.json` ដែរ។

**ដំណោះស្រាយ:** បង្កើត favicon set ត្រឹមត្រូវ (favicon.ico + 32px/180px PNG ជាក់លាក់ មិនមែនរូបថតពេញមុខ) ហើយបន្ថែម `<link>` tag ត្រឹមត្រូវទៅគ្រប់ទំព័រ។

### 8. Google Analytics ដំណើរការតែលើ Homepage (1/25 ទំព័រ)
**កន្លែង:** `gtag.js` snippet មានតែក្នុង `index.html` — ទំព័រផ្សេងទាំង 24 (រួមទាំង Projects, About, Contact — ជាទំព័រដែល hiring manager ចំណាយពេលច្រើនបំផុត) គ្មាន tracking ទាល់តែសោះ។ លើសពីនេះ `privacy-policy.html` ពិពណ៌នាថា Google Analytics តាមដាន "which pages are viewed" ពេញ site — ដែលមិនត្រូវនឹងការអនុវត្តជាក់ស្តែង។ នេះមិនប៉ះពាល់ដល់ hiring manager ដោយផ្ទាល់ទេ (ព្រោះគាត់មិនឃើញ analytics) ប៉ុន្តែជា bug ដ៏ធំសម្រាប់ខ្លួនអ្នកផ្ទាល់ ព្រោះលោកអ្នកនឹងមិនដឹងថាមាននរណាមកមើលទំព័រណាខ្លះ។

### 9. Project ដែលមាន Live Demo ស្រាប់ តែមិនបានដាក់ link
**កន្លែង:** `pages/projects/pctn-fertilizer-shop.html` — GitHub README ពិតប្រាកដបញ្ជាក់ថា site នេះ deploy រួចហើយនៅ `https://pctn.pichchanthorn.me` ប៉ុន្តែទាំង `projects.html` និងទំព័រ detail មិនបានដាក់ប៊ូតុង "Live Demo" ទេ — មានតែ "View Source Code"។ នេះជាចំណុចងាយកែបំផុតតែផ្តល់ផលច្រើនបំផុត ព្រោះ hiring manager ចង់ click មើល demo ផ្ទាល់ជាងអានតែ source code។

### 10. Dark mode អាចបង្ហាញពណ៌ខុសនៅទំព័រ Education
**កន្លែង:** `pages/education.html` lines 30-96 មាន `<style>` block ដាក់ដោយផ្ទាល់ក្នុង `<head>` (ទំព័រផ្សេងទាំងអស់ពឹងផ្អែកលើ `assets/css/main.css` តែមួយ)។ Style នេះប្រើ CSS variable ដូចជា `var(--text,#111827)`, `var(--muted,#6b7280)`, `var(--card-bg, #fff)` — ដែល**មិនមាន**ក្នុង design system ពិតប្រាកដរបស់ site (ឈ្មោះពិតគឺ `--clr-text`, `--clr-text-muted`, `--clr-bg`)។ ដោយសារឈ្មោះ variable មិនត្រូវគ្នា CSS នឹងប្រើតែពណ៌ fallback ដែល hardcode ជា light-mode ជានិច្ច — មានន័យថា card មួយចំនួននៅទំព័រនេះទំនងជានៅតែបង្ហាញផ្ទៃខាងក្រោយពណ៌ស/អក្សរខ្មៅ សូម្បីតែពេលអ្នកប្តូរទៅ Dark Mode ក៏ដោយ។ **គួរសាកល្បងមើលទំព័រនេះក្នុង Dark Mode ដើម្បីបញ្ជាក់ ហើយកែឈ្មោះ variable ឲ្យត្រូវ។**

---

## 🟡 Medium Priority

### 11. Language switcher (English/Khmer) មិនដំណើរការលើប្រហែលពាក់កណ្តាល site
ត្រួតពិនិត្យផ្ទាល់ខ្លួនរកឃើញថា `data-i18n` attribute (ដែលធ្វើឲ្យអត្ថបទប្តូរជាភាសាខ្មែរបាន) **គ្មានទាល់តែសោះ**នៅលើ project detail pages ទាំង 12, `cv.html`, និង blog post — សរុប 15/25 ទំព័រ។ ចំណែក sidebar/navigation (ដែលបង្ហាញលើគ្រប់ទំព័រតាមរយៈ JS) នៅតែប្តូរជាភាសាខ្មែរធម្មតា។ លទ្ធផលគឺ: ចុច "ខ្មែរ" លើ project page ណាមួយ → menu ខាងឆ្វេងប្តូរជាខ្មែរ ប៉ុន្តែខ្លឹមសារសំខាន់ (project description) នៅតែជាភាសាអង់គ្លេស — mixed-language experience ដែលមើលទៅមិនទាន់សម្រេច។ ដំណោះស្រាយសមហេតុផលបំផុតប្រហែលជា: លាក់ language switcher លើទំព័រទាំងនេះ ឬបន្ថែម `data-i18n` ឲ្យពេញ។

### 12. Title tag pattern មិនដូចគ្នារវាងទំព័រ
ទំព័រនីមួយៗប្រើ template ខុសគ្នា៖ `about.html`/`contact.html` = "About Pich Chanthorn | IT Student & Aspiring Full-Stack Web Developer"; `skills.html` = "Skills | Pich Chanthorn Information Technology Student..." (**គ្មាន separator រវាងឈ្មោះ និង role** — មើលទៅដូចជាប្រយោគជាប់គ្នា); `education.html`/`experience.html`/`privacy-policy.html` = "[Page] | Pich Chanthorn Portfolio"; `cv.html` = "CV | Pich Chanthorn" (khliểu ជាងគេ)។ Title tag នេះជាអ្វីដែលបង្ហាញនៅ browser tab និង Google search result ដូច្នេះភាពមិនស៊ីគ្នាមើលឃើញច្បាស់។ គួរជ្រើសយក pattern តែមួយប្រើឲ្យដូចគ្នាទាំងអស់។

### 13. Sitemap.xml មាន URL ស្ទួន និងខ្វះ 2 ទំព័រ
`https://pichchanthorn.me/pages/blog/outstanding-student-bbu.html` លេចឡើងពីរដងជាប់គ្នាដោយ `changefreq` ខុសគ្នា (monthly vs yearly) — មើលទៅដូចជា copy-paste ភ្លេចលុប។ ក្រៅពីនេះ `privacy-policy.html` (ដែល link ចេញពី footer រាល់ទំព័រ) និង `audio-host.html` មិនមាននៅក្នុង sitemap ទេ។

### 14. គ្មាន Custom 404 Page
Site នេះមិនមាន `404.html` ទេ — link ខុស ឬ typo ណាមួយនឹងទៅដល់ GitHub's default 404 ធម្មតា ដែលមិនត្រូវនឹង design ដ៏ទំនើបនៃ site ទាំងមូល។

### 15. Skills percentage ជាលេខច្បាស់លាស់ (85%, 65%...) ដោយគ្មានប្រភព
`skills.html` ដាក់ percentage ជាក់លាក់សម្រាប់ skill ប្រហែល 35 មុខ (ឧ. HTML 85%, React 65%)។ Percentage បែបនេះជា "red flag" ដ៏ល្បីមួយសម្រាប់ portfolio ព្រោះគ្មាននរណាអាចពន្យល់បានច្បាស់ថា "ហេតុអ្វី 65% មិនមែន 70%?" ក្នុងកម្រិត interview។ (ល្អដែល skill ទាំងនេះមានភស្តុតាងគាំទ្រតាម project ពិតប្រាកដ — មិនមែនប្រឌិត — គ្រាន់តែរបៀបបង្ហាញងាយត្រូវគេជំទាស់)។ គួរប្តូរទៅជា tier ដូចជា Beginner/Intermediate/Advanced ជំនួសវិញ ឬដកលេខចេញ ឲ្យ project ជា proof ជំនួស។

### 16. Certificates page: ឆ្នាំ hardcode ចាស់ + រូបភាពធំពេក + file ស្ទួន
- Sidebar footer នៅ `certificates.html` hardcode "© 2025" (ដូចបញ្ហា #5)
- រូបភាព certificate មួយចំនួនធំពេក (1.3-2.1MB ក្នុងមួយសន្លឹក, សរុបជាង 10MB លើទំព័រតែមួយ) — ធ្វើឲ្យទំព័រនេះផ្ទុកយឺត ជាពិសេសលើ mobile
- File `Junior Cybersecurity Analyst Career Path Exam.jpg` (1.4MB) ស្ទួនជាមួយ `junior-cybersecurity-analyst-exam.jpg` ដែលកំពុងប្រើ — file ចាស់មិនប្រើ នៅសល់ក្នុង repo ដោយឥតប្រយោជន៍
- File certificate មួយចំនួនមានឈ្មោះមាន space ក្នុងនោះ (ឧ. "Play It Safe Manage Security Risks.jpg") ខណៈឯផ្សេងទៀតប្រើ kebab-case (`cybersecurity-essentials.jpg`) — មិនស៊ីគ្នា

### 17. CV download button លើ Homepage នាំទៅកន្លែងផ្សេងពី CV page ក្នុង site
`index.html` ប៊ូតុង "Download CV" នាំទៅ `https://cvforge.pichchanthorn.me/editor` (CV builder tool ខាងក្រៅ) ជំនួសឲ្យទៅ `pages/cv.html` ដែលមាន PDF download ផ្ទាល់ស្រាប់ក្នុង repo ។ មិនមែនខុសទាំងស្រុងទេ (ប្រហែលជាចង់ឲ្យអ្នកចូលមើលបង្កើត CV ថ្មី) ប៉ុន្តែសម្រាប់ hiring manager ដែលចង់ "download CV" ភ្លាមៗ ការចូលទៅកាន់ "editor" tool ខាងក្រៅភ្លាមៗនោះ អាចមើលទៅច្របូកច្របល់។ គួរពិចារណាថាតើនេះជាចេតនាឬអត់។

### 18. Employer domain បង្ហោះនៅ free-hosting subdomain (`minicontact.rf.gd`)
Demo link របស់ project "PHP Mini Contact" ប្រើ free subdomain (InfinityFree) ដែលអាចយឺត ឬ downtime ដោយមិននឹកស្មានដល់។ គួរ verify ថានៅដំណើរការល្អឬអត់មុន interview ណាមួយ ហើយប្រសិនបើអាចធ្វើបាន គួរប្តូរទៅ subdomain ផ្ទាល់ខ្លួន (ដូច `team208.pichchanthorn.me`) ដើម្បីមើលទៅសមស្របគ្នាជាមួយ project ផ្សេងទៀត។

### 19. Education page: លេខ GPA មិនស៊ីគ្នា
"Year 2 GPA: 3.80" បង្ហាញជាចុងក្រោយស្រេច ខណៈ Semester 4 (ដែលជាផ្នែកនៃ Year 2) សម្គាល់ច្បាស់ថា "GPA: Pending" ដោយមានមុខវិជ្ជា 2 កំពុងរង់ចាំលទ្ធផល។ គណនាមិនទាន់ចប់ ប៉ុន្តែបង្ហាញលេខចុងក្រោយស្រាប់ — អ្នកអានហ្មត់ចត់នឹងសម្គាល់ឃើញថាមិនត្រូវគ្នា។

---

## 🟢 Low Priority / Polish

- **Contact page heading hierarchy**: `<h1>Get in Touch</h1>` លោត heading level ត្រង់ទៅ `<h3>Send a Message</h3>` ដោយគ្មាន `<h2>` — មិនប៉ះពាល់ visual តែប៉ះពាល់ screen-reader navigation
- **JSON-LD `sameAs`** នៅ contact.html រាយ YouTube/Facebook profile តែមិនបានបង្ហាញនៅក្នុង "Preferred Channels" ដែលអ្នកមើលឃើញផ្ទាល់ភ្នែក — មិនស៊ីគ្នារវាង structured data និង UI
- **Date format មិនស៊ីគ្នា**: `education.html` ប្រើ "7/07/2026" (មិនច្បាស់ថាថ្ងៃ ឬខែមុន) ខណៈ `privacy-policy.html` ប្រើ "July 25, 2026" ពេញលេញ — គួរជ្រើសយករបៀបតែមួយ
- **Heading level មិនស៊ីគ្នា**: Card "Program summary" ប្រើ `<h2>` ខណៈ card "Academic Stats" ក្បែរគ្នាប្រើ `<h3>` ទាំងដែលមានទម្ងន់ស្មើគ្នា
- **Button label មិនដូចគ្នា**: card ទី១លើ `projects.html` ដាក់ស្លាកប៊ូតុង "GitHub" ខណៈ card ផ្សេងទាំងអស់ដាក់ "Code"
- **Meta project label មិនស៊ីគ្នា**: project មួយចំនួនប្រើ "Web Programming Coursework" ជំនួសពាក្យតួនាទី (role) ដូចគេ ខណៈ project ស្រដៀងគ្នាដទៃទៀតប្រើ "Frontend Developer" ជាដើម
- **Achievement list មាន "planned" feature**: "Daily Tracker" ចុះបញ្ជី "Planned extensions for bilingual support" ក្នុងផ្នែក "Key Achievements" ដែលគួរតែជាកិច្ចការសម្រេចរួច មិនមែនផែនការនាពេលអនាគត
- **Unused image assets**: មានរូបភាព stock/placeholder ចំនួន 16 សន្លឹកក្នុង `assets/img/projects/` (ឧ. `kanban-task-board-dark-mode.jpg`, `weather-dashboard-app-dark-theme.jpg`) ដែលមិនត្រូវបានប្រើនៅកន្លែងណាមួយសោះ — ប្រហែលមកពី template ចាស់ សល់ក្នុង repo ដោយអត់ចេតនា
- **Meta description វែងពេក**: `about.html` មាន meta description វែង 281 តួអក្សរ (Google តែងកាត់នៅប្រហែល 155-160) ដូច្នេះផ្នែកខាងចុងនឹងមិនបង្ហាញលើលទ្ធផលស្វែងរក
- **Lucide icon library មិន pin version**: `<script src="https://unpkg.com/lucide@latest">` ប្រើ `@latest` ជំនួសពី version ជាក់លាក់ — ប្រសិនបើ library ចេញ version ថ្មីដែល breaking change site អាចខូចភ្លាមដោយគ្មានការព្រមាន
- **CSS breakpoints ច្រើនតាមអំណោយចិត្ត**: `responsive.css` មាន breakpoint រហូតដល់ 12 ខុសគ្នា (480px, 550px, 640px, 680px, 700px, 720px, 768px, 900px, 950px, 960px, 980px, 1024px) ជំនួសឲ្យប្រព័ន្ធស្តង់ដារតិចជាងនេះ — មិនប៉ះពាល់ hiring manager ដោយផ្ទាល់ ប៉ុន្តែជានិមិត្តរូបនៃ codebase ដែលរីកចម្រើនតាមចំណុចនីមួយៗជាជាងមាន design system ពីដើម
- **University email ជា primary contact**: `pich_chanthorn@pp.bbu.edu.kh` ប្រើនៅលើ CV និង Contact page ដែលដំណើរការល្អកំឡុងពេលរៀន ប៉ុន្តែនឹងឈប់ដំណើរការក្រោយបញ្ចប់ការសិក្សា (2028) — គួរគិតទុកជាមុនអំពី email ផ្ទាល់ខ្លួន
- **`audio-host.html`** គ្មាន `noindex` meta tag — ដោយសារវាជា hidden iframe utility page មិនមែនសម្រាប់មនុស្សមើលផ្ទាល់ ប្រសិនបើត្រូវ search engine crawl ចូលដោយចៃដន្យ វានឹងបង្ហាញជាទំព័រទទេច្របូកច្របល់លើ Google

---

## ✅ អ្វីដែលធ្វើបានល្អរួចហើយ — កុំកែ

- **Contact form** (`contact-form.js`): មាន honeypot spam protection, rate limiting, field validation ជាមួយ `aria-live` error region, i18n-aware text, និង `try/catch` ត្រឹមត្រូវជុំវិញ EmailJS call — implementation កម្រិតខ្ពស់ជាង portfolio និស្សិតភាគច្រើន
- **Audio widget cross-tab sync** (`audio-host.html` + `music-widget.js`): ប្រើ postMessage architecture ជាមួយ origin check, localStorage persistence, autoplay-block handling — technically ស្មុគស្មាញ និងធ្វើបានយ៉ាងប្រុងប្រយ័ត្ន
- **Education page accordion**: ប្រើ real `<button>`, `aria-expanded`/`aria-controls`, keyboard support, reduced-motion handling ត្រឹមត្រូវតាម accessibility best practice
- **Meta tags, canonical URL, title** (លើកលែងតែចំណុចដែលរាយខាងលើ): unique សម្រាប់ស្ទើរគ្រប់ទំព័រ គ្មានការចម្លងគ្នា — SEO hygiene ល្អជាង portfolio និស្សិតភាគច្រើន
- **Navigation consistency**: sidebar nav តាមទំព័រនីមួយៗត្រឹមត្រូវ (9 links ដូចគ្នា, `active` state ត្រូវ, relative path ត្រូវតាមកម្រិត folder)
- **Project pages structure**: ទាំង 12 detail pages ប្រើ template ដូចគ្នាបេះបិទ (Hero → About → Key Features → Achievements → sidebar Tech Stack/Links) — មិនមែនចម្លង-កែប្លែងៗគ្នាដូចជា site ធម្មតា
- **GitHub links ពិតប្រាកដទាំងអស់**: verify ដោយផ្ទាល់ថា repo ទាំង 8 ដែលពិនិត្យសុទ្ធតែពិត មិនមែន 404 ឬ empty stub ទេ — ជាអ្វីដែល hiring manager verify មុនគេ ហើយឆ្លងកាត់
- **Tech stack ជាក់លាក់**: project card រៀងរាល់មួយសរសេរ technology ជាក់លាក់ (ឧ. "PHP · MySQL · PDO · Bootstrap 5 · Security") មិនប្រើពាក្យទូទៅមិនច្បាស់ដូចជា "various technologies"
- **Alt text លើរូបភាព**: រូបភាព project ទាំងអស់មាន alt text ជាក់លាក់ ពិពណ៌នាច្បាស់ (មិនមែន "image" ទទេ)
- **Privacy Policy page**: សរសេរច្បាស់លាស់ អានងាយ មាន table of contents ពិត ពិពណ៌នា EmailJS/GitHub Pages/CDN ត្រឹមត្រូវ — កម្រិតវិជ្ជាជីវៈខ្ពស់ជាង portfolio និស្សិតភាគច្រើនដែលមិនដាក់ទំព័រនេះផង
- **About/Experience page content flow**: រចនាសម្ព័ន្ធ heading (h1→h2→h3) ស្អាត គ្មានលោត level
- **CSS design token system**: `base.css` មាន custom properties ច្បាស់លាស់ជាប្រព័ន្ធសម្រាប់ពណ៌ theme — មិនមែន hardcode តាមកន្លែង

---

## 📋 អ្វីខ្លះដែលខ្វះ — Portfolio Developer ជំនាញច្រើនតែមាន

ក្រៅពី bug/inconsistency ខាងលើ នេះជា **feature/section** ដែល portfolio វិជ្ជាជីវៈច្រើនតែមាន ប៉ុន្តែ site នេះមិនទាន់មាន (មិនមែនកំហុសទេ គ្រាន់តែជា gap):

1. **Testimonials / Recommendations** — សម្រង់សម្តីខ្លីៗពី lecturer, team member, ឬ manager ចាស់ (ជាពិសេសពី Haystack Labs) ជួយបង្កើនទំនុកចិត្តខ្លាំង
2. **GitHub activity/contribution graph** — embed ឬ link ទៅ GitHub profile ដោយផ្ទាល់ ដើម្បីបង្ហាញភស្តុតាងកូដពិតប្រាកដ
3. **Blog មានខ្លឹមសារបច្ចេកទេសពិតប្រាកដ** — បច្ចុប្បន្ន blog មានតែ 1 post ជាការប្រកាសពានរង្វាន់សិក្សា ខណៈ meta description សន្យាថានឹងមាន "Linux system administration, secure PHP, Oracle database" ដែលមិនទាន់មាន — ការសរសេរ technical post ជាក់ស្តែងបន្ថែម (ទោះខ្លីៗ) នឹងបង្កើនទំនុកចិត្តខ្លាំង
4. **Demo screenshot/GIF សម្រាប់ project ដែលគ្មាន live demo**: Smart Admin Dashboard (project លេចធ្លោបំផុត) និង YouTube Telegram Bot មិនអាចមាន live demo click បាន (ព្រោះត្រូវការ hosting ពិសេស) — screen recording ខ្លីៗ ឬ demo credentials នឹងជួយបំពេញចន្លោះនេះបានច្រើន
5. **Resume/CV ជា ATS-friendly text version** — file PDF មួយហើយអាចគ្រប់គ្រាន់ ប៉ុន្តែក្រុមហ៊ុនធំៗច្រើនប្រើ Applicant Tracking System (ATS) ដែលអានពិបាកលើ PDF design ស្មុគស្មាញ — text/plain version ជំនួយបាន
6. **"Now" ឬ current focus section** — អ្វីដែលកំពុងសិក្សា/ធ្វើឥឡូវនេះ (ឧ. Data Science នៅ CADT) ជួយឲ្យ portfolio មើលទៅ "រស់" និង update ជានិច្ច

---

## សង្ខេប — លំដាប់ណែនាំសម្រាប់ចាប់ផ្តើម

ប្រសិនបើចង់ចាប់ផ្តើមតូចៗ តែផលប៉ះពាល់ធំបំផុតមុនគេ៖

1. កែ "Pich Chan Thorn" → "Pich Chanthorn" (#1) — 30 វិនាទី
2. កែ project list លើ CV ឲ្យត្រូវនឹង project ពិតប្រាកដ (#2)
3. ជ្រើសយកឈ្មោះក្រុមហ៊ុនតែមួយ "Haystack Labs" ឬ "Haystack Solutions" (#3)
4. កែ sidebar footer copyright year ឲ្យ dynamic ដូច homepage (#5) — កែម្តងឯកសារ 23
5. បន្ថែម PCTN ជា timeline entry លើ Experience page (#4)
6. ដោះស្រាយ blog card ដែល click អត់ចូល (#6)
7. បន្ថែម favicon ត្រឹមត្រូវពេញ site (#7)
8. បន្ថែម Google Analytics ពេញ site (#8)
9. បន្ថែម Live Demo link សម្រាប់ PCTN Fertilizer Shop (#9)

ចំណុចផ្សេងទៀត (Medium/Low) អាចធ្វើតាមក្រោយបាន។

---

*របាយការណ៍នេះបង្កើតដោយ Claude ធ្វើការជា senior developer review portfolio មុនពេលសម្ភាសន៍ការងារ។ Repository ត្រូវបានអានពេញលេញ (HTML/CSS/JS គ្រប់ file) និង cross-check link/asset ដោយស្វ័យប្រវត្តិ — មិនមែនត្រឹមមើលផ្ទៃ (visual) ទេ។*
