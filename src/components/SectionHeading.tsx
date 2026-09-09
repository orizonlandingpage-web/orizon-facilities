interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  onDark?: boolean;
}

/**
 * Cabeçalho de seção padrão da página: eyebrow pequeno em dourado, título em
 * serif de display, régua dourada fina e descrição opcional. É o elemento
 * que carrega a direção "editorial sóbrio" — nada de sombra ou gradiente.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  onDark = false,
}: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && (
        <p
          className={`mb-3 font-body text-sm font-semibold tracking-[0.2em] uppercase ${
            onDark ? 'text-gold' : 'text-gold-text'
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-3xl leading-tight sm:text-4xl ${onDark ? 'text-offwhite' : 'text-navy'}`}
      >
        {title}
      </h2>
      <div
        className={`mt-4 h-px w-16 bg-gold ${align === 'center' ? 'mx-auto' : ''}`}
        aria-hidden="true"
      />
      {description && (
        <p className={`mt-4 text-lg ${onDark ? 'text-graymid' : 'text-graytext'}`}>{description}</p>
      )}
    </div>
  );
}
