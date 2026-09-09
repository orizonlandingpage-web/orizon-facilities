import { useEffect, useRef, useState } from 'react';

/**
 * Fallback via IntersectionObserver para o scroll-reveal, usado quando o
 * navegador não suporta `animation-timeline: view()` nativo (hoje, Firefox).
 * A detecção de suporte fica no CSS (`@supports`); este hook só entra em
 * ação quando `Reveal` decide usá-lo como fallback.
 *
 * Dispara uma única vez: assim que o elemento entra na viewport, o observer
 * é desconectado — não precisamos saber se ele sai de novo.
 */
export function useInView<T extends Element>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}
