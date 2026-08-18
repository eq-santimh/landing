'use client';

import { useTranslations } from 'next-intl';

const ITEMS = [
  { valueKey: 'minTicketValue', descriptionKey: 'minTicket' },
  { valueKey: 'marketValue', descriptionKey: 'market' },
  { valueKey: 'classesValue', descriptionKey: 'classes' },
] as const;

export default function StatsSection() {
  const t = useTranslations('HomePage.Stats');

  return (
    <section className="border-y border-eq-line bg-white">
      <div className="eq-shell grid gap-6 py-10 sm:grid-cols-3">
        {ITEMS.map(({ valueKey, descriptionKey }) => (
          <article key={valueKey} className="text-center">
            <p className="financial-figure text-4xl text-eq-ink">{t(valueKey)}</p>
            <p className="eq-text-small mt-2 text-eq-muted">{t(descriptionKey)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
