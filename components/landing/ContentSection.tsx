import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ContentSectionProps = {
  id?: string;
  title?: string;
  description?: string;
  className?: string;
  children?: ReactNode;
};

export function ContentSection({ id, title, description, className, children }: ContentSectionProps) {
  return (
    <section id={id} className={cn('eq-shell py-14 sm:py-20', className)}>
      {title || description ? (
        <header className="mb-10 max-w-3xl">
          {title ? <h1 className="text-3xl tracking-tight text-eq-ink sm:text-4xl lg:text-5xl">{title}</h1> : null}
          {description ? <p className="eq-text-body mt-4 text-eq-muted">{description}</p> : null}
        </header>
      ) : null}
      {children}
    </section>
  );
}

export function ContentCard({ className, children }: { className?: string; children: ReactNode }) {
  return <article className={cn('marketplace-card p-5 sm:p-7', className)}>{children}</article>;
}
