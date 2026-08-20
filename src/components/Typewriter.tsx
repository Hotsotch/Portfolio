"use client";

import { useTypewriter } from "@/hooks/useTypewriter";

type TypewriterProps = {
  phrases: string[];
};

export default function Typewriter({ phrases }: TypewriterProps) {
  const text = useTypewriter(phrases);

  return (
    <span>
      {text}
      <span className="typewriter-cursor" aria-hidden="true">
        |
      </span>
    </span>
  );
}
