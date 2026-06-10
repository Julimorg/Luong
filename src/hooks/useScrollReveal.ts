import { useEffect, useRef, useState } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const { threshold = 0.15, rootMargin = "0px 0px -60px 0px", once = true } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}

// Tailwind animation classes
export const revealClasses = {
  fadeUp: (visible: boolean, delay = 0) =>
    `transition-all duration-700 ease-out ${
      delay ? `delay-[${delay}ms]` : ""
    } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`,

  fadeIn: (visible: boolean, delay = 0) =>
    `transition-all duration-700 ease-out ${
      delay ? `delay-[${delay}ms]` : ""
    } ${visible ? "opacity-100" : "opacity-0"}`,

  slideLeft: (visible: boolean, delay = 0) =>
    `transition-all duration-700 ease-out ${
      delay ? `delay-[${delay}ms]` : ""
    } ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`,
};