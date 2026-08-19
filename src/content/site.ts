export type Project = {
  /** Stable id, used for anchor targets and expand/collapse state. */
  id: string;
  title: string;
  year: string;
  /** One line, shown collapsed. */
  summary: string;
  tools: string[];
  /** Paragraphs shown when expanded. */
  detail: string[];
  /** A concrete outcome — efficiency, latency, placement, size. */
  result: string;
  /** Optional external link, e.g. a repo. Omit if there is none. */
  href?: string;
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
    id: "project-one",
    title: "[PROJECT ONE TITLE]",
    year: "[YEAR]",
    summary: "[ONE LINE — WHAT IT IS AND WHAT IT DOES]",
    tools: ["[TOOL]", "[TOOL]", "[TOOL]"],
    detail: [
      "[WHAT PROBLEM THIS SOLVED AND WHY IT MATTERED.]",
      "[WHAT YOU SPECIFICALLY DESIGNED, BUILT, OR MEASURED. Be concrete about your own contribution if this was a team project.]",
    ],
    result: "[A MEASURED OUTCOME — e.g. 92% peak efficiency at 12V input]",
  },
  {
    id: "project-two",
    title: "[PROJECT TWO TITLE]",
    year: "[YEAR]",
    summary: "[ONE LINE — WHAT IT IS AND WHAT IT DOES]",
    tools: ["[TOOL]", "[TOOL]", "[TOOL]"],
    detail: [
      "[WHAT PROBLEM THIS SOLVED AND WHY IT MATTERED.]",
      "[WHAT YOU SPECIFICALLY DESIGNED, BUILT, OR MEASURED.]",
    ],
    result: "[A MEASURED OUTCOME]",
  },
  {
    id: "project-three",
    title: "[PROJECT THREE TITLE]",
    year: "[YEAR]",
    summary: "[ONE LINE — WHAT IT IS AND WHAT IT DOES]",
    tools: ["[TOOL]", "[TOOL]"],
    detail: [
      "[WHAT PROBLEM THIS SOLVED AND WHY IT MATTERED.]",
      "[WHAT YOU SPECIFICALLY DESIGNED, BUILT, OR MEASURED.]",
    ],
    result: "[A MEASURED OUTCOME]",
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
  name: "[YOUR FULL NAME]",
  initials: "[XX]",
  role: "Electrical Engineering Student",

  /** One sentence. Appears in the hero and as the meta description. */
  tagline:
    "Electrical engineering student focused on [YOUR FOCUS AREA], seeking a [SEASON YEAR] internship.",

  about: [
    "[TWO OR THREE SENTENCES ABOUT WHO YOU ARE AND WHAT YOU BUILD. Lead with the concrete — the systems you have actually worked on — rather than adjectives about yourself.]",
    "[ONE SENTENCE ON WHAT YOU ARE LOOKING FOR. State the role type, the season, and the year.]",
  ],

  education: {
    school: "[YOUR UNIVERSITY]",
    degree: "[B.S. Electrical Engineering]",
    graduation: "[EXPECTED GRADUATION YEAR]",
    coursework: [
      "[RELEVANT COURSE 1]",
      "[RELEVANT COURSE 2]",
      "[RELEVANT COURSE 3]",
      "[RELEVANT COURSE 4]",
    ],
  },

  projects,
  skills,

  contact: {
    email: "[YOU@EXAMPLE.COM]",
    github: "https://github.com/[YOUR-USERNAME]",
    linkedin: "https://linkedin.com/in/[YOUR-USERNAME]",
    cv: "/cv.pdf",
  },
};
