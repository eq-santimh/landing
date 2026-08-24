import { EQUITTY_MARK_FACETS, EQUITTY_MARK_VIEW_BOX } from '@/lib/equittyMark';
import { cn } from '@/lib/utils';

type HeroLogoMarkProps = {
  className?: string;
  label: string;
};

const PARTICLES = Array.from({ length: 20 }, (_, index) => {
  const angle = (index / 20) * Math.PI * 2 + (index % 3) * 0.16;
  const distance = 30 + (index % 4) * 9;
  return {
    tone: index % 2 === 0 ? 'teal' : 'blue',
    style: {
      '--particle-size': `${2 + (index % 3)}px`,
      '--particle-delay': `${(0.35 + (index % 7) * 0.05).toFixed(2)}s`,
      '--particle-x': `${(Math.cos(angle) * distance).toFixed(2)}px`,
      '--particle-y': `${(Math.sin(angle) * distance).toFixed(2)}px`,
    } as Record<string, string>,
  };
});

export default function HeroLogoMark({ className, label }: HeroLogoMarkProps) {
  return (
    <div className={cn('hero-isotipo hero-isotipo--crystal relative aspect-square', className)}>
      <div className="hero-isotipo-energy" aria-hidden>
        {PARTICLES.map((particle, index) => (
          <span
            key={index}
            className={`hero-particle hero-particle--${particle.tone}`}
            style={particle.style}
          />
        ))}
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={EQUITTY_MARK_VIEW_BOX}
        width="100%"
        height="100%"
        role="img"
        aria-label={label}
        className="hero-isotipo-svg relative z-10 h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient id="hero-steel-facet" x1="58%" y1="18%" x2="92%" y2="88%">
            <stop offset="0%" stopColor="#4e8197" />
            <stop offset="100%" stopColor="#3f6889" />
          </linearGradient>
          <linearGradient id="hero-teal-shine" x1="8%" y1="0%" x2="62%" y2="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.34" />
            <stop offset="38%" stopColor="#d8ffff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hero-steel-shine" x1="100%" y1="6%" x2="48%" y2="88%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.26" />
            <stop offset="42%" stopColor="#8eb8d8" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="hero-teal-core" cx="22%" cy="14%" r="52%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.28" />
            <stop offset="55%" stopColor="#7ee7f0" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#7ee7f0" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hero-steel-core" cx="88%" cy="22%" r="48%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="60%" stopColor="#8eb8d8" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#8eb8d8" stopOpacity="0" />
          </radialGradient>
          <filter id="hero-crystal-trail" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" />
          </filter>
        </defs>

        {EQUITTY_MARK_FACETS.map((facet) => {
          const position = facet.id === 'turquoise' ? 'top' : 'bottom';
          const fill = position === 'top' ? facet.fill : 'url(#hero-steel-facet)';
          const shine = position === 'top' ? 'url(#hero-teal-shine)' : 'url(#hero-steel-shine)';
          const core = position === 'top' ? 'url(#hero-teal-core)' : 'url(#hero-steel-core)';
          const stroke = position === 'top' ? '#7ee7f0' : '#8eb8d8';

          return (
            <g key={facet.id} className={`triangle-assembly triangle-assembly--${position}`}>
              <polygon
                points={facet.points}
                fill={facet.fill}
                className={`triangle-trail triangle-trail--${position}`}
                filter="url(#hero-crystal-trail)"
              />
              <polygon
                points={facet.points}
                fill={fill}
                stroke={stroke}
                strokeWidth="0.9"
                className={`triangle-${position}`}
              />
              <polygon points={facet.points} fill={shine} className={`triangle-shine triangle-shine--${position}`} />
              <polygon points={facet.points} fill={core} className={`triangle-core triangle-core--${position}`} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
