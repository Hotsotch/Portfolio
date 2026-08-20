export type Project = {
  /** Stable id, used as the /work/[id] URL slug. */
  id: string;
  title: string;
  year: string;
  /** One line, shown in the work list. */
  summary: string;
  /** Optional short badge shown near the title, e.g. an award or placement. */
  award?: string;
  /** Badge color for `award`. Omit for the default accent (gold). */
  awardColor?: "accent" | "blue";
  /** Optional. Omit and use `links` instead when a project reads better as
   *  a list of external links than a tag list (e.g. no discrete tools). */
  tools?: string[];
  /** Optional list of external links, shown instead of Tools when present. */
  links?: { label: string; href: string }[];
  /** Paragraphs shown on the project's own page. */
  detail: string[];
  /** Optional numbered steps, shown under a "Process" label in smaller type. */
  process?: string[];
  /** A concrete outcome — efficiency, latency, placement, size.
   *  A string renders as one paragraph; a string array renders as bullets. */
  result: string | string[];
  /** Optional external link, e.g. a repo. Omit if there is none. */
  href?: string;
  /** Square preview shown on hover in the work list, and on the project page.
   *  Omit until a real photo exists — a placeholder fills in for it. */
  image?: string;
  /** Second square image, shown on the project page below the Tools/Result
   *  column. Omit until a real photo exists — a placeholder fills in for it. */
  secondaryImage?: string;
  /** Row of 4 evenly-spaced square images shown below the left-column text
   *  instead of the secondaryImage column. Entries are optional — an empty
   *  or short array still renders 4 slots, filling missing ones with a
   *  placeholder until real photos exist. */
  gallery?: string[];
  /** Optional physical components list, shown on the project page when present. */
  hardware?: string[];
  /** Optional detailed libraries/services list, distinct from the higher-level `tools` tags. */
  stack?: string[];
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

/**
 * Typed explicitly rather than inferred, so optional fields such as
 * `href` stay available on every project even when no entry sets one.
 */
const projects: Project[] = [
  {
    id: "popejournal",
    title: "Pope's Journal",
    year: "2026",
    summary:
      "A Raspberry Pi 5-based voice journal device with AI-powered mood tracking and task extraction",
    tools: ["Raspberry Pi", "Python", "Linux", "Electronics", "AI Agent"],
    detail: [
      "I realized that I rarely stop and look back.",
      "I needed a way to quickly remind myself of what I need to-do, what had happened, and how I was feeling.",
      "Therefore I designed and built this voice journaling device using a full AI pipeline that turns spoken words into structured insight.",
      "I talk into it daily, and it transcribes, analyzes, and stores my entries automatically, then sends me a weekly digest with mood trends and recommendations — all while having a display.",
    ],
    process: [
      "1. Audio capture -> voice input is recorded using Python's sounddevice library, triggered by a latching rocker switch wired to GPIO with a pull-up resistor.",
      "2. Transcription -> recordings are transcribed locally using faster-whisper (tiny.en model), keeping the pipeline fast and offline-capable at the transcription stage.",
      "3. AI analysis -> the transcribed text is sent to the Anthropic API, where an AI agent extracts structured data from each entry: a summary, mood rating (1–5), reasoning behind the mood, key topics, and any commitments or to-dos mentioned.",
      "4. Storage ->every entry is saved to a local SQLite database with FTS5 full-text search, so past entries can be searched by keyword.",
      "5. Display -> a custom dark-themed UI runs on a 7\" 1024x600 HDMI touchscreen, showing mood as an emoji inside a bordered circle with a colored status dot for at-a-glance mood tracking.",
      "6. Weekly digest -> a scheduled script (via cron) queries the week's entries, calls the Anthropic API to generate a summary and personalized recommendations, and emails it to me through Gmail SMTP.",
    ],
    result:
      "Automatic to-do tracking pulled from spoken entries, daily 1–5 mood logging with contextual reasoning, and an automated weekly email digest with personalized recommendations.",
    secondaryImage: "/popejournal-hardware.png",
    hardware: [
      "Raspberry Pi 5 (core compute unit)",
      "7\" 1024x600 HDMI touchscreen",
      "Latching rocker switch on GPIO with a pull-up resistor",
    ],
    stack: [
      "Python",
      "sounddevice",
      "faster-whisper",
      "Anthropic API",
      "SQLite (FTS5)",
      "Pydantic",
      "Gmail SMTP",
      "cron",
    ],
  },
  {
    id: "vinpack",
    title: "VinPack",
    year: "2025",
    summary: "A modular portable battery system for VinFast EVs",
    award: "VinFast Hackathon 1st Place",
    links: [
      { label: "YSpace Post", href: "https://lnkd.in/p/gDRXMgtH" },
      {
        label: "VinPack Idea Documentation",
        href: "/vinpack-idea-documentation.docx",
      },
      {
        label: "Scooter Swappable Battery",
        href: "https://gadigarage.com/vinfast-battery-swap-network-new-electric-scooters/",
      },
    ],
    detail: [
      "Built with a 5-person team for the YSpace Automotive Innovation Challenge, VinPack is a dual modular backup battery for VinFast EVs: two 3 kWh, 40 lb swappable packs (6 kWh combined) that plug in to kill range anxiety.",
      "The design pairs a track-guided connector with a sealed cooling loop and smart charging logic that piggybacks off VinFast's existing charging port, so no new hardware is needed on the vehicle side.",
      "We backed the engineering with a full go-to-market and cost model: about CAD $1,485 to produce per unit, targeted at a $2,000–$2,500 retail price.",
    ],
    result:
      "First place at the Automotive Innovation Challenge (YSpace, York University, in partnership with VinFast and OVIN) — and real-world validation: VinFast later launched its own swappable battery system on the Evo, Feliz II, and Viper electric scooters in Vietnam.",
    hardware: [
      "Two 3 kWh, 40 lb swappable battery packs (6 kWh combined)",
      "Track-guided connector interface",
      "Sealed cooling loop",
      "Smart charging module (VinFast port-compatible)",
    ],
    image: "/vinpack-1.jpg",
    gallery: ["/vinpack-4-3d.png", "/vinpack-3-schematic.png", "/vinpack-2.jpg"],
  },
  {
    id: "safety-alert-button",
    title: "Safety Alert Button (SAB)",
    year: "2025",
    summary:
      "A GPS-enabled emergency alert device that sends users live location to an emergency contact with the press of a button",
    award: "2nd year Design Project (ELEC 290)",
    awardColor: "blue",
    tools: [
      "Arduino",
      "C++",
      "GPS/Embedded Systems",
      "IoT",
      "Circuit Design",
      "API Integration",
    ],
    detail: [
      "Research shows that students who feel safe and secure on campus perform better academically.",
      "Queen's campus itself is well-secured, but that security doesn't extend past the front gates.",
      "In 2024 alone, Campus Security logged over 5,500 criminal, misconduct, and safety incidents on campus, and off-campus numbers are even higher.",
      "Since most students live off campus, this project set out to give students, and their parents, greater peace of mind on the walk or drive home.",
      "For ELEC 290, our 5-person team tackled this with SAB, a portable distress button. When held for three seconds, it sends the user's GPS coordinates and a Google Maps link straight to a designated emergency contact.",
      "Switching to WiFi + webhook let the device piggyback on the user's phone hotspot, eliminating the need for a SIM card, cellular module, or companion app.",
      "Testing exposed clear weak points: GPS accuracy dropped to 18% inside heavily shielded concrete buildings, and the email-to-SMS pathway we relied on is being phased out by most Canadian carriers. The next iteration would swap in a more accurate GPS module (SparkFun SAM-M10Q), move to a dedicated SMS service like Twilio, and migrate from breadboard to a compact PCB small enough to fit on a keychain.",
    ],
    process: [
      "1. Trigger -> holding the momentary push button (INPUT_PULLUP, pin 7) for 3 seconds arms the alert, with a 5-second cooldown to block spam and an RGB LED giving status feedback.",
      "2. Location -> the NEO-7M GPS module is polled via TinyGPSPlus for users location.",
      "3. Transmission -> the Arduino Uno WiFi Rev 2 sends an HTTPS webhook request over WiFiNINA, piggybacking off the user's phone hotspot, straight to IFTTT.",
      "4. Delivery -> IFTTT forwards the coordinates as an email-to-SMS message with a Google Maps link to the emergency contact's phone, and the blue LED confirms successful transmission.",
    ],
    result: [
      "Sub-20-second alert delivery with a success rate above the 85% target on a stable connection",
      "100% of outdoor GPS readings landed within 30 m (most within the 10 m goal), with 95% of outdoor trials achieving a fix in under 5 seconds",
      "95% accuracy in standard buildings and 70% while in motion, across 30 trials in four environments",
      "Built for under $100 CAD in prototype hardware, with a scaled BOM target of $20-30",
    ],
    hardware: [
      "Arduino Uno WiFi Rev 2",
      "NEO-7M GPS module",
      "Momentary push button (INPUT_PULLUP, pin 7)",
      "RGB LED with 220 ohm current-limiting resistors",
    ],
    stack: ["Arduino", "C++", "WiFiNINA", "TinyGPSPlus", "SoftwareSerial", "IFTTT"],
    image: "/sab-1.png",
    secondaryImage: "/sab-hardware.png",
  },
];

const skills: SkillGroup[] = [
  { label: "Languages", items: ["[C]", "[Python]", "[VHDL]", "[MATLAB]"] },
  { label: "Hardware", items: ["[STM32]", "[FPGA]", "[PCB DESIGN]"] },
  { label: "Software", items: ["[KiCad]", "[LTspice]", "[Altium]", "[Git]"] },
  {
    label: "Lab",
    items: ["[OSCILLOSCOPE]", "[SPECTRUM ANALYZER]", "[SOLDERING]"],
  },
];

export const site = {
  name: "Isaac Popov",
  initials: "IP",
  role: "Electrical Engineering Undergraduate",

  /** One sentence. Used as the meta description (page title, social previews). */
  tagline:
    "Queen's University",

  /** Cycled by the hero's typewriter effect, one phrase at a time. */
  heroRotatingRoles: ["Electrical Engineering Undergraduate", "Queen's University"],

  about: [
    "I'm a third-year Electrical Engineering student who loves working with electronics, circuits, and DIY projects. EVs and AI are what I'm most interested in. I've built a few projects in both areas and won a hackathon focused on EV tech.",
    "When I'm not doing engineering stuff, I coach baseball and try to perfect my knuckleball!",
  ],

  education: {
    school: "Queen's University",
    degree: "B.Sc. Electrical Engineering",
    graduation: "2029",
    coursework: [
      "Electronics",
      "Data Science",
      "[RELEVANT COURSE 3]",
      "[RELEVANT COURSE 4]",
    ],
  },

  projects,
  skills,

  contact: {
    email: "isaacpopov10@gmail.com",
    github: "https://github.com/Hotsotch",
    linkedin: "https://www.linkedin.com/in/isaac-popov/",
    cv: "/cv.pdf",
  },
};
