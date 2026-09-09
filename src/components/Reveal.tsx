import type { HTMLAttributes } from 'react';
import { useInView } from '../lib/use-in-view';

type RevealProps = HTMLAttributes<HTMLDivElement>;

/**
 * Wrapper de scroll-reveal. O efeito visual em si é 100% CSS (classe
 * `.reveal` em src/styles/index.css, via `animation-timeline: view()`).
 * Este componente só existe para prover `data-inview` como fallback nos
 * navegadores que ainda não suportam scroll-driven animations (Firefox).
 */
export function Reveal({ children, className, ...rest }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className={`reveal ${className ?? ''}`} data-inview={inView} {...rest}>
      {children}
    </div>
  );
}
