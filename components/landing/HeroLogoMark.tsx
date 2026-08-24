import { EQUITTY_MARK_FACETS, EQUITTY_MARK_VIEW_BOX } from '@/lib/equittyMark';
import { cn } from '@/lib/utils';

type HeroLogoMarkProps = {
  className?: string;
  label: string;
};

export default function HeroLogoMark({ className, label }: HeroLogoMarkProps) {
  return (
    <div className={cn('hero-isotipo relative aspect-square', className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={EQUITTY_MARK_VIEW_BOX}
        width="100%"
        height="100%"
        role="img"
        aria-label={label}
        className="h-full w-full"
      >
        {EQUITTY_MARK_FACETS.map((facet) => {
          const position = facet.id === 'turquoise' ? 'top' : 'bottom';

          return (
            <g key={facet.id} className={`triangle-assembly triangle-assembly--${position}`}>
              <polygon points={facet.points} fill={facet.fill} className={`triangle-${position}`} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
