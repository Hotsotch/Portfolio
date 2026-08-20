/**
 * Maps a `Project.stack` entry to the icon shown for it at the bottom of
 * the project page. Keys match stack strings exactly; anything missing
 * falls back to a generic icon so a new stack entry never breaks the page.
 */
export const techIcons: Record<string, string> = {
  Python: "/icons/python.svg",
  sounddevice: "/icons/sounddevice.svg",
  "faster-whisper": "/icons/faster-whisper.svg",
  "Anthropic API": "/icons/anthropic.svg",
  "SQLite (FTS5)": "/icons/sqlite.svg",
  Pydantic: "/icons/pydantic.svg",
  "Gmail SMTP": "/icons/gmail.svg",
  cron: "/icons/cron.svg",
};

const FALLBACK_ICON = "/icons/generic.svg";

export function getTechIcon(name: string): string {
  return techIcons[name] ?? FALLBACK_ICON;
}
