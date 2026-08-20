import { useEffect, useState } from "react";

type UseTypewriterOptions = {
  /** ms per character while typing. */
  typingSpeedMs?: number;
  /** ms per character while deleting. */
  deletingSpeedMs?: number;
  /** ms to hold a fully-typed phrase before deleting it. */
  pauseMs?: number;
};

/**
 * Cycles through `phrases`, typing each one out character by character,
 * pausing, deleting it, then moving to the next — forever.
 */
export function useTypewriter(
  phrases: string[],
  { typingSpeedMs = 65, deletingSpeedMs = 35, pauseMs = 1500 }: UseTypewriterOptions = {},
) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting && charCount === currentPhrase.length) {
      const pause = setTimeout(() => setIsDeleting(true), pauseMs);
      return () => clearTimeout(pause);
    }

    if (isDeleting && charCount === 0) {
      setIsDeleting(false);
      setPhraseIndex((i) => (i + 1) % phrases.length);
      return;
    }

    const speed = isDeleting ? deletingSpeedMs : typingSpeedMs;
    const step = setTimeout(() => {
      setCharCount((c) => c + (isDeleting ? -1 : 1));
    }, speed);

    return () => clearTimeout(step);
  }, [charCount, isDeleting, phraseIndex, phrases, typingSpeedMs, deletingSpeedMs, pauseMs]);

  return phrases[phraseIndex].slice(0, charCount);
}
