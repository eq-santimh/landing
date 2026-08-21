import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ContentSectionProps = {
  id?: string;
  title?: string;
  description?: string;
  headingAs?: 'h1' | 'h2';
  className?: string;
  children?: ReactNode;
};

export function ContentSection({
  id,
  title,
  description,
  headingAs = 'h1',
  className,
  children,
}: ContentSectionProps) {
  const Heading = headingAs;

  return (
    <section id={id} className={cn('eq-shell py-12 sm:py-16 lg:py-20', className)}>
      {title || description ? (
        <header className="mb-8 max-w-3xl sm:mb-10">
          {title ? (
            <Heading
              className={cn(
                'tracking-tight text-eq-ink',
                headingAs === 'h1'
                  ? 'text-2xl sm:text-4xl lg:text-[2.75rem]'
                  : 'text-xl sm:text-3xl lg:text-4xl',
              )}
            >
              {title}
            </Heading>
          ) : null}
          {description ? <p className="eq-text-body mt-3 text-sm text-eq-muted sm:mt-4 sm:text-base">{description}</p> : null}
        </header>
      ) : null}
      {children}
    </section>
  );
}

export function ContentCard({ className, children }: { className?: string; children: ReactNode }) {
  return <article className={cn('marketplace-card p-5 sm:p-7', className)}>{children}</article>;
}
