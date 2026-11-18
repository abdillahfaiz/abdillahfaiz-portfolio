export interface ProjectMediaItem {
  src: string;
  caption: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  category: 'Published' | 'POS & Operations' | 'Corporate & AI';
  tagline: string;
  description: string;
  longDescription: string;
  stack: string[];
  highlights: string[];
  architectureNotes: string[];
  image: string;
  gallery?: ProjectMediaItem[];
  externalUrl?: string;
  externalLabel?: string;
  hasLiveDemo: boolean;
  demoPreviewNote: string;
}

export interface SkillItem {
  name: string;
  description: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  items: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  responsibilities: string[];
  technologies: string[];
  editableNote?: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  major: string;
  period: string;
  gpa: string;
}

export const ASSETS = {
  wallpaperLight: '/src/assets/images/macos_wallpaper_light_1794884732808.jpg',
  portrait: '/assets/aistudio/DSCF821g1__1__fb04e0a3.jpg',
  portraitCutout: '/assets/aistudio/DSCF8211__1_-removebg_124896eb.png',
  cvPdf: '/assets/aistudio/Abdillah_Faiz_s_CV_-_Mobile_Apps_Developer_1c8c3100.pdf',
  portfolioPdf: '/assets/aistudio/Abdillah_Faiz_Portfolio00_2cd1e03d.pdf',
};

export const PROFILE = {
  name: 'Abdillah Faiz',
  shortRole: 'Mobile Apps Developer · Mid-Level Flutter Developer',
  heroHeadline: 'Building Digital Experiences.',
  heroSupporting:
    "I'm Abdillah Faiz, a Mid-Level Flutter Developer with 3 years of experience expanding into Backend Engineering.",
  heroDescription:
    'Proficient in Flutter, Dart, Clean Architecture, BLoC, Kotlin Platform Channels, CI/CD pipelines, and Google Play Store releases—currently expanding full-stack capabilities with NestJS and Go.',
  techBadges: ['Flutter', 'Dart', 'Kotlin', 'TypeScript', 'NestJS', 'Go'],
  email: 'abdillahdotfaizz@gmail.com',
  phone: '+6285894618922',
  githubHandle: '@abdillahfaiz',
  githubUrl: 'https://github.com/abdillahfaiz',
  linkedinHandle: 'in/abdillah-faiz-15a02a249',
  linkedinUrl: 'https://www.linkedin.com/in/abdillah-faiz-15a02a249/',
  location: 'Kab. Bandung, Jawa Barat',
  shortLocation: 'Bandung, Indonesia',
};

export const ABOUT_CONTENT = {
  summary:
    'Mid-Level Flutter Developer with 3 years of experience designing, developing, and maintaining cross-platform mobile applications. Proficient in Flutter, Dart, state management, RESTful API integration, and modular application architecture, with hands-on experience in CI/CD pipelines, Google Play Store releases, and expanding backend engineering skills in NestJS and Go.',
  sections: [
    {
      id: 'introduction',
      label: 'Introduction',
      title: '3 years crafting production mobile apps with Flutter & Clean Architecture',
      body: 'As a Mobile Developer Flutter at PT Inovasi Karya Resman since June 2023, I build scalable cross-platform applications from feature implementation through Google Play Store production deployment—applying Clean Architecture, SOLID principles, BLoC state management, and native Android Kotlin Platform Channels.',
    },
    {
      id: 'journey',
      label: 'Career Journey',
      title: 'From mobile engineering & Next.js web systems to full-stack depth',
      body: 'Alongside my core mobile role, I also worked as a Freelance Front End Developer at PT Hanorf Citra Gemilang (August 2025 – April 2026), developing a Next.js hospital ERP application covering patient management, billing, and inventory modules integrated with RESTful APIs.',
    },
    {
      id: 'philosophy',
      label: 'Engineering Standards',
      title: 'Maintainable architecture, app security, and automated delivery',
      body: 'I prioritize modular codebases, secure local storage and token management, sensitive data protection, and automated CI/CD pipelines so teams can ship reliable builds consistently without regressions.',
    },
    {
      id: 'learning',
      label: 'Education & Focus',
      title: 'D4 Software Engineering Technology — Politeknik IDN Bogor (GPA 3.75)',
      body: 'Graduating from D4 Software Engineering Technology at Politeknik IDN Bogor (2022 – 2026) while actively expanding backend engineering skills using NestJS, Express.js, and Go to bridge mobile clients and resilient server architectures.',
    },
  ],
  statement:
    'I translate business requirements into maintainable mobile and web software—built cleanly from user interface to automated deployment.',
};

export const EDUCATION: EducationItem[] = [
  {
    id: 'politeknik-idn',
    institution: 'Politeknik IDN Bogor',
    degree: 'D4 — Applied Bachelor',
    major: 'Software Engineering Technology',
    period: '2022 – 2026',
    gpa: '3.75',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'sipp-ra-jabar',
    name: 'SIPP RA Jabar',
    category: 'Published',
    tagline: 'Google Play Store · 4.9★ · 1K+ Downloads',
    description:
      'Sistem Informasi Pelayanan Pembelajaran Raudhatul Athfal Jawa Barat—published Flutter mobile application for school management, daily prayer times, qibla, and educational media.',
    longDescription:
      'SIPP RA Jabar streamlines school administration and Islamic early-childhood learning across Raudhatul Athfal institutions in West Java. Built with Flutter and published on Google Play Store (4.9★ rating, 1,000+ downloads), the app supports authenticated and guest access, prayer schedule & qibla compass, school vision/mission profiles, organizational structure, storytelling (Dongeng), religious modules, educational games, and public media galleries.',
    stack: ['Flutter', 'Dart', 'REST API', 'Firebase', 'Google Play'],
    highlights: [
      'Published to Google Play Store with 4.9★ rating and 1,000+ installs',
      'Guest login mode alongside account authentication for public school information access',
      'Integrated prayer time schedule, qibla direction, school profile, agenda, gallery, and educational modules',
    ],
    architectureNotes: [
      'Clean feature separation covering Auth, Prayer/Qibla utilities, School Profile, and Public Media feeds',
      'Optimized image caching and API payload handling for smooth school directory browsing',
      'Production Android release configuration and Google Play Store deployment pipeline',
    ],
    image: '/assets/aistudio/sippra_a4f60d11.png',
    gallery: [
      {
        src: '/assets/aistudio/sippra_a4f60d11.png',
        caption: 'Google Play Store Listing',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2024-10-23_at_08.31.29_74ebc320_1_d7a2492e.png',
        caption: 'Login & Masuk sebagai Tamu',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2024-10-23_at_08.30.13_62683d95_1_5de01d0a.png',
        caption: 'Beranda, Jadwal Sholat & Kiblat',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2024-10-23_at_08.30.14_7a7493a9_1_7224d440.png',
        caption: 'Profil Sekolah (Visi & Misi)',
      },
      {
        src: '/assets/aistudio/sippra1_b3a8e209.webp',
        caption: 'Formulir Pendaftaran PPDB',
      },
      {
        src: '/assets/aistudio/sippra6_9941c5cc.webp',
        caption: 'Agenda Sekolah',
      },
      {
        src: '/assets/aistudio/sippra5_820c1e42.webp',
        caption: 'Ajukan Izin Siswa',
      },
      {
        src: '/assets/aistudio/sippra3_9f2845a8.webp',
        caption: 'Prestasi & Detail Kejuaraan',
      },
      {
        src: '/assets/aistudio/sippra4_ebf6d32f.webp',
        caption: 'Cerita & Dongeng Edukatif',
      },
      {
        src: '/assets/aistudio/sippra2_83e463bf.webp',
        caption: 'Galeri Foto Sekolah',
      },
    ],
    externalUrl: 'https://play.google.com/store/apps/details?id=com.sippra_jabar.mobile',
    externalLabel: 'Google Play',
    hasLiveDemo: true,
    demoPreviewNote: 'Live on Google Play Store (com.sippra_jabar.mobile)',
  },
  {
    id: 'lacee-pos',
    name: 'Lacee POS App',
    category: 'POS & Operations',
    tagline: 'Flutter Tablet Point of Sale & Pin & Dine',
    description:
      'Tablet-first Flutter Point-of-Sale application featuring menu catalog ordering, Pin & Dine table management, offline order synchronization, and thermal printer integration.',
    longDescription:
      'Lacee POS App is a corporate tablet Point-of-Sale system designed for cafes and restaurants. It covers real-time menu filtering, itemized cart calculations with PPN tax and packaging fees, Pin & Dine table availability tracking (Reserved, In Use, Empty), transaction history filtering & reporting, offline-first order queuing with batch sync and receipt printing, plus product stock availability and connected thermal printer management (RPP02 / RPP02N).',
    stack: ['Flutter', 'Dart', 'Offline Sync', 'Thermal Printer', 'REST API'],
    highlights: [
      'Split-pane tablet POS workflow with category filters, live cart, PPN tax, and packaging totals',
      'Pin & Dine floor view tracking 20+ tables with occupancy, pax capacity, and unpaid order totals',
      'Offline order storage with batch synchronization (Sync Order) and direct receipt printer pairing',
    ],
    architectureNotes: [
      'Local persistence queue enabling uninterrupted cashier checkout when store internet drops',
      'Hardware abstraction layer for discovering and managing connected thermal receipt printers',
      'Responsive landscape tablet layout tuned for rapid counter touch interactions',
    ],
    image: '/assets/portfolio/lacee-pos.jpg',
    gallery: [
      {
        src: '/assets/portfolio/lacee-pos.jpg',
        caption: 'Katalog Menu & Order Kasir',
      },
      {
        src: '/assets/aistudio/Group_37468_0996ef18.png',
        caption: 'Pin & Dine — Manajemen Meja & Pesanan',
      },
      {
        src: '/assets/aistudio/Group_37314_7d088088.png',
        caption: 'Riwayat Transaksi & Filter Order',
      },
      {
        src: '/assets/aistudio/Group_37330_bf4ce15e.png',
        caption: 'Sinkronisasi Order Offline & Cetak Struk',
      },
      {
        src: '/assets/aistudio/Group_37325_0a835d4e.png',
        caption: 'Pengaturan Stok & Ketersediaan Produk',
      },
      {
        src: '/assets/aistudio/Group_37469_b48ecb8a.png',
        caption: 'Pengaturan Perangkat & Printer Thermal',
      },
    ],
    hasLiveDemo: false,
    demoPreviewNote: 'Corporate Flutter tablet POS & hardware printer showcase',
  },
  {
    id: 'nusa-ritel',
    name: 'Nusa Ritel App',
    category: 'Published',
    tagline: 'Google Play Store · Cooperative E-Commerce',
    description:
      'Online shop mobile application built for cooperative (koperasi) members using Flutter and BLoC state management, published on Google Play Store.',
    longDescription:
      'Developed as a corporate Flutter project using the BLoC state management pattern, Nusa Ritel App enables cooperative members to browse categorized groceries and household staples, manage itemized orders with transparent shipping and platform fee breakdowns, track real-time SLA delivery stages, and manage personal or business accounts.',
    stack: ['Flutter', 'Dart', 'BLoC', 'REST API', 'Google Play'],
    highlights: [
      'Built with Flutter & BLoC for predictable cart, catalog, and checkout state transitions',
      'Real-time SLA order lifecycle tracking (Order Created -> Packed -> Out for Delivery -> Received)',
      'Published on Google Play Store (com.nusaretail.mobile) for cooperative member transactions',
    ],
    architectureNotes: [
      'Clean Architecture with BLoC cubits/blocs separating UI screens from repository data sources',
      'Dedicated checkout calculation layer handling personal delivery fees and itemized quantities',
      'Authenticated member profile management with account upgrade and SLA notification badges',
    ],
    image: '/assets/portfolio/nusa-ritel.jpg',
    externalUrl: 'https://play.google.com/store/apps/details?id=com.nusaretail.mobile',
    externalLabel: 'Google Play',
    hasLiveDemo: true,
    demoPreviewNote: 'Live on Google Play Store (com.nusaretail.mobile)',
  },
  {
    id: 'anggo-app',
    name: 'Anggo App',
    category: 'Corporate & AI',
    tagline: 'Corporate Attendance, Bills & E-Wallet',
    description:
      'Employee attendance, monthly work-hour recap, PPOB bill payment, and integrated E-Wallet application built with Flutter and BLoC state management.',
    longDescription:
      'Anggo App unifies workplace attendance tracking and financial utility services in a single Flutter corporate mobile application. Employees can view daily attendance recaps and total monthly working hours (present, absent, holidays, overtime), pay utility bills (Pulsa, Internet & TV, PDAM, PLN, BPJS Kesehatan), and manage an in-app E-Wallet (Dompet) with withdrawal, transaction mutations, and daily earnings summaries.',
    stack: ['Flutter', 'Dart', 'BLoC', 'E-Wallet', 'REST API'],
    highlights: [
      'Attendance log & monthly work-hour recap tracking regular hours, absences, and overtime pay',
      'Integrated PPOB utility & bill payments (PLN, PDAM, BPJS, Internet/TV, Top Up)',
      'In-app Dompet (E-Wallet) displaying active balance, withdrawals, and daily income mutations',
    ],
    architectureNotes: [
      'BLoC-driven state management for synchronized attendance status and wallet balance updates',
      'Secure token storage and transaction validation flows protecting financial mutations',
      'Modular service tiles architecture for scaling bill-payment and voucher features',
    ],
    image: '/assets/portfolio/anggo-app.jpg',
    hasLiveDemo: false,
    demoPreviewNote: 'Corporate Flutter & BLoC attendance + E-Wallet showcase',
  },
  {
    id: 'khudi-app',
    name: 'Khudi App',
    category: 'Corporate & AI',
    tagline: 'Multi-Language & Multi-Theme AI Chat',
    description:
      'Corporate AI Chat mobile application created with Flutter and BLoC state management, supporting English/Arabic localization and multi-theme dark/light surfaces.',
    longDescription:
      'Khudi App is a conversational AI assistant mobile client engineered in Flutter with BLoC state management. Designed for global usability, it features onboarding language selection (English & Arabic with RTL awareness), adaptive light/dark theming, social sign-up (Google, Apple, Facebook), GPT model switching, and full chat management (New Chat, Share, Rename, Delete, History).',
    stack: ['Flutter', 'Dart', 'BLoC', 'i18n (EN/AR)', 'Multi-Theme'],
    highlights: [
      'Multi-language experience supporting English and Arabic localization out of the box',
      'Dynamic multi-theme system alongside dark-first conversational AI chat UI',
      'Complete conversation lifecycle tools: model selector, New Chat, Rename, Share, Delete, and History',
    ],
    architectureNotes: [
      'BLoC stream handling for responsive message composition, chat history, and quota tracking',
      'ThemeData token switching and localization delegates supporting LTR/RTL layout mirroring',
      'Bottom-sheet contextual actions keeping chat screens clean and distraction-free',
    ],
    image: '/assets/portfolio/khudi-app.jpg',
    hasLiveDemo: false,
    demoPreviewNote: 'Corporate Flutter AI Chat UI & localization showcase',
  },
  {
    id: 'sbt-auth',
    name: 'SBT Auth App (SIA UAD)',
    category: 'Corporate & AI',
    tagline: 'Passwordless Web3 / Soulbound Token Login',
    description:
      'Academic Information System (SIA UAD) Flutter application implementing passwordless authentication using Polygon Web3 wallets and Soulbound Tokens (SBT).',
    longDescription:
      'Built as a corporate security-focused Flutter application for SIA UAD, SBT Auth replaces traditional password logins with cryptographic Web3 wallet verification and Soulbound Tokens (SBT) on Polygon. Students connect their digital wallet, verify academic identity via SBT, view GPA and credit progress, check daily class schedules, and manage wallet connection security.',
    stack: ['Flutter', 'Dart', 'Web3 / Polygon', 'Soulbound Token', 'Auth'],
    highlights: [
      'Passwordless authentication flow connecting digital wallets and verifying SBT credentials',
      'Student academic dashboard displaying cumulative GPA, passed credits, and daily class schedule',
      'Wallet connection management screen showing Polygon address status and secure sign-out',
    ],
    architectureNotes: [
      'Decoupled Web3 wallet connector & SBT verification service behind clean repository interfaces',
      'Secure local session state keeping wallet address bindings tamper-resistant',
      'Clear status feedback transitions (Wallet Not Connected -> Ready to Login -> Verified Profile)',
    ],
    image: '/assets/portfolio/sbt-auth.jpg',
    hasLiveDemo: false,
    demoPreviewNote: 'Passwordless Web3 SBT academic authentication showcase',
  },
  {
    id: 'general-affair',
    name: 'General Affair App',
    category: 'POS & Operations',
    tagline: 'Hospital Facility Maintenance & Inspection',
    description:
      'Flutter operations app for hospital general-affair maintenance staff (RS Primaya Makassar) covering preventive checklists, genset load forms, drafts, and schedules.',
    longDescription:
      'General Affair App empowers hospital maintenance teams to execute daily and monthly preventive maintenance inspections across critical facilities including AC units, UPS systems, electrical panels, STP, vacuum pumps, PABX, and genset load testing. Technicians can filter tasks (To Do, Done, Missed), fill structured inspection checklists, save drafts locally, and audit activity history.',
    stack: ['Flutter', 'Dart', 'Offline Drafts', 'Forms', 'REST API'],
    highlights: [
      'Structured preventive maintenance checklists for AC, UPS, electrical panels, and genset load tests',
      'Daily and monthly schedule tracking split cleanly into To Do, Done, and Missed tabs',
      'Draft persistence (Simpan Draft) and multi-report form submission (Kirim) for field technicians',
    ],
    architectureNotes: [
      'Dynamic form builder supporting checkboxes, technical readings (Evaporator/Kondensor), and attachments',
      'Local draft persistence preventing data loss during basement or mechanical-room inspections',
      'Role-scoped hospital location switcher and recent maintenance activity audit trail',
    ],
    image: '/assets/portfolio/general-affair.jpg',
    hasLiveDemo: false,
    demoPreviewNote: 'Hospital maintenance & inspection workflow showcase',
  },
  {
    id: 'laundry-app',
    name: 'Laundry App (Drop & Go)',
    category: 'POS & Operations',
    tagline: 'Final Thesis · QR Drop & Go + Payment Gateway',
    description:
      'Android laundry application built with Flutter for my D4 final thesis ("Sistem Drop And Go"), integrating QR drop-off, payment gateway (BCA VA), and thermal receipt printing.',
    longDescription:
      'Developed as my D4 Software Engineering Technology final thesis at Politeknik IDN Bogor ("Rancang Bangun Aplikasi Laundry Berbasis Android Dengan Sistem Drop And Go"), this Flutter app modernizes self-drop laundry orders. Customers scan outlet QR codes for Drop & Go, choose Kiloan or Satuan services with fragrance/duration options, track 5-step order progress, pay seamlessly via BCA Virtual Account payment gateway, and print receipts via thermal printers.',
    stack: ['Flutter', 'Dart', 'Payment Gateway', 'Thermal Printer', 'QR Scan'],
    highlights: [
      'QR Drop & Go workflow with nearby outlet discovery and Kiloan/Satuan service configuration',
      '5-stage live order tracker (Drop -> Weight -> Wash -> Pickup -> Done) with QR pickup verification',
      'Integrated BCA Virtual Account payment gateway and Bluetooth thermal printer receipt printing',
    ],
    architectureNotes: [
      'Clean Architecture separating QR scanner, order lifecycle, payment gateway callbacks, and thermal print service',
      'Real-time order status sync between customer mobile tracking and outlet weighing updates',
      'Verified transaction IDs and automated payment expiration timers in checkout details',
    ],
    image: '/assets/portfolio/laundry-app.jpg',
    hasLiveDemo: false,
    demoPreviewNote: 'D4 Final Thesis — Drop & Go Laundry App (Politeknik IDN Bogor)',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'mobile',
    title: 'Mobile Development',
    subtitle: 'Cross-platform Flutter apps, native Android Kotlin bridges, and production releases',
    items: [
      {
        name: 'Flutter & Dart',
        description:
          '3 years building scalable cross-platform mobile applications with Clean Architecture, SOLID principles, and BLoC state management through Google Play Store release.',
      },
      {
        name: 'Android & Kotlin',
        description:
          'Native Android integrations via Flutter Platform Channels with Kotlin to access platform-specific capabilities.',
      },
      {
        name: 'Mobile Integrations',
        description:
          'Payment gateways, Firebase services, Google Maps, third-party SDKs, local storage caching, and secure token management.',
      },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend & UI',
    subtitle: 'Responsive web interfaces and design collaboration',
    items: [
      {
        name: 'React.js & Next.js',
        description:
          'Hospital ERP web applications covering patient management, billing, and inventory modules with RESTful API synchronization.',
      },
      {
        name: 'TypeScript & JavaScript',
        description:
          'Strongly typed web modules, predictable API integration, and clean component architecture.',
      },
      {
        name: 'Figma',
        description:
          'Translating UI/UX specifications into visually consistent, responsive mobile and web interfaces.',
      },
    ],
  },
  {
    id: 'backend',
    title: 'Backend Development',
    subtitle: 'RESTful services, modular TypeScript backends, and full-stack expansion',
    items: [
      {
        name: 'NestJS & Express.js',
        description:
          'Modular Node.js and TypeScript backend services, structured routing, validation, and RESTful API design.',
      },
      {
        name: 'Laravel',
        description:
          'Structured MVC web backends, database migrations, and server-side API endpoints.',
      },
      {
        name: 'Go',
        description:
          'Expanding backend engineering skills with idiomatic Go services, clean packages, and lightweight concurrency.',
      },
    ],
  },
  {
    id: 'database',
    title: 'Database & Storage',
    subtitle: 'Relational modeling, caching, and application data security',
    items: [
      {
        name: 'PostgreSQL & MySQL',
        description:
          'Normalized relational schemas, transactional workflows, and pragmatic indexing for web and mobile backends.',
      },
      {
        name: 'Firebase & Local Cache',
        description:
          'Firestore sync, offline caching strategies, secure token storage, and sensitive data protection.',
      },
    ],
  },
  {
    id: 'tools',
    title: 'CI/CD & Dev Tools',
    subtitle: 'Build automation, release management, and team collaboration',
    items: [
      {
        name: 'CI/CD & Play Store',
        description:
          'Automated build, testing, and deployment pipelines alongside Google Play Store production release management.',
      },
      {
        name: 'Git & GitHub',
        description:
          'Clean commit history, pull request workflows, and collaborative software development lifecycle practices.',
      },
      {
        name: 'Docker',
        description:
          'Reproducible local database and backend service environments with containers.',
      },
    ],
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'inovasi-karya-resman',
    role: 'Mobile Developer Flutter',
    company: 'PT Inovasi Karya Resman',
    period: 'June 2023 – Now',
    location: 'Indonesia',
    summary:
      'Mid-level Flutter engineer responsible for building, securing, automating, and shipping cross-platform mobile applications to Google Play Store.',
    responsibilities: [
      'Developed and maintained scalable cross-platform mobile applications using Flutter, from feature implementation to production deployment on Google Play Store.',
      'Designed maintainable application architectures using Clean Architecture, SOLID principles, and BLoC for efficient state management.',
      'Integrated RESTful APIs, payment gateways, Firebase services, third-party SDKs, and Google Maps to support complex application functionalities.',
      'Implemented native Android integrations using Flutter Platform Channels with Kotlin to access platform-specific features and capabilities.',
      'Managed local storage, data caching, and application security, including secure token management and sensitive data protection.',
      'Implemented CI/CD pipelines to automate application build, testing, and deployment processes.',
    ],
    technologies: [
      'Flutter',
      'Dart',
      'Clean Architecture',
      'BLoC',
      'Kotlin',
      'Firebase',
      'Google Maps',
      'CI/CD',
    ],
  },
  {
    id: 'hanorf',
    role: 'Front End Developer (Freelance)',
    company: 'PT Hanorf Citra Gemilang',
    period: 'August 2025 – April 2026',
    location: 'Indonesia',
    summary:
      'Developed and maintained a hospital ERP web application using Next.js to improve operational efficiency and healthcare data management.',
    responsibilities: [
      'Developed and maintained a hospital ERP web application using Next.js to improve operational efficiency and data management.',
      'Built responsive and user-friendly interfaces for modules such as patient management, billing, and inventory.',
      'Integrated RESTful APIs to ensure seamless data synchronization between frontend and backend systems.',
      'Collaborated with backend engineers and UI/UX designers to deliver reliable and visually consistent solutions.',
    ],
    technologies: ['Next.js', 'React.js', 'TypeScript', 'JavaScript', 'REST API', 'Figma'],
  },
];
