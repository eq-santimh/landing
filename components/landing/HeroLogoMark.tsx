import { EQUITTY_MARK_FACETS, EQUITTY_MARK_VIEW_BOX } from '@/lib/equittyMark';
import { cn } from '@/lib/utils';

type HeroLogoMarkProps = {
  className?: string;
  label: string;
};

const PARTICLES = Array.from({ length: 28 }, (_, index) => {
  const angle = (index / 28) * Math.PI * 2 + (index % 3) * 0.18;
  const distance = 34 + (index % 5) * 10;
  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    delay: 0.35 + (index % 8) * 0.06,
    size: 3 + (index % 3),
    tone: index % 2 === 0 ? 'teal' : 'blue',
  };
});

export default function HeroLogoMark({ className, label }: HeroLogoMarkProps) {
  return (
    <div className={cn('hero-isotipo hero-isotipo--crystal relative aspect-square', className)}>
      <div className="hero-isotipo-glass" aria-hidden />
      <div className="hero-isotipo-energy" aria-hidden>
        {PARTICLES.map((particle, index) => (
          <span
            key={index}
            className={`hero-particle hero-particle--${particle.tone}`}
            style={{
              width: particle.size,
              height: particle.size,
              animationDelay: `${particle.delay}s`,
              ['--particle-x' as string]: `${particle.x}px`,
              ['--particle-y' as string]: `${particle.y}px`,
            }}
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
          <linearGradient id="crystal-top" x1="8%" y1="0%" x2="88%" y2="78%">
            <stop offset="0%" stopColor="#d8ffff" />
            <stop offset="28%" stopColor="#7ee7f0" />
            <stop offset="62%" stopColor="#4bb9c0" />
            <stop offset="100%" stopColor="#176e78" />
          </linearGradient>
          <linearGradient id="crystal-bottom" x1="100%" y1="0%" x2="42%" y2="100%">
            <stop offset="0%" stopColor="#9ec8e8" />
            <stop offset="34%" stopColor="#5b8fb3" />
            <stop offset="68%" stopColor="#46728e" />
            <stop offset="100%" stopColor="#1d3f58" />
          </linearGradient>
          <linearGradient id="crystal-top-shine" x1="0%" y1="0%" x2="70%" y2="80%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="42%" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="crystal-bottom-shine" x1="100%" y1="8%" x2="48%" y2="92%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.42" />
            <stop offset="38%" stopColor="#7ee7f0" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="crystal-core" cx="50%" cy="50%" r="42%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#7ee7f0" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#7ee7f0" stopOpacity="0" />
          </radialGradient>
          <filter id="crystal-glow-top" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="crystal-glow-bottom" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="crystal-trail" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.4" />
          </filter>
        </defs>

        {EQUITTY_MARK_FACETS.map((facet) => {
          const position = facet.id === 'turquoise' ? 'top' : 'bottom';
          const fill = position === 'top' ? 'url(#crystal-top)' : 'url(#crystal-bottom)';
          const shine = position === 'top' ? 'url(#crystal-top-shine)' : 'url(#crystal-bottom-shine)';
          const stroke = position === 'top' ? '#7ee7f0' : '#8eb8d8';
          const filter = position === 'top' ? 'url(#crystal-glow-top)' : 'url(#crystal-glow-bottom)';

          return (
            <g key={facet.id} className={`triangle-assembly triangle-assembly--${position}`}>
              <polygon
                points={facet.points}
                fill={stroke}
                opacity="0.55"
                className={`triangle-trail triangle-trail--${position}`}
                filter="url(#crystal-trail)"
              />
              <polygon
                points={facet.points}
                fill={fill}
                stroke={stroke}
                strokeWidth="1.15"
                filter={filter}
                className={`triangle-${position}`}
              />
              <polygon points={facet.points} fill={shine} className={`triangle-shine triangle-shine--${position}`} />
              <polygon points={facet.points} fill="url(#crystal-core)" className="triangle-core" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
