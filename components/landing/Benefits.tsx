'use client';

import { useTranslations } from 'next-intl';
import SectionHeading from '@/components/landing/SectionHeading';

const BENEFIT_KEYS = ['item1', 'item2', 'item3', 'item4'] as const;

export default function Benefits() {
  const t = useTranslations('HomePage.Benefits');

  return (
    <section className="bg-eq-paper py-20 sm:py-28">
      <div className="eq-shell">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {BENEFIT_KEYS.map((key) => (
            <article key={key} className="marketplace-card p-7">
              <h3 className="text-2xl font-semibold text-eq-ink">{t(`${key}.title`)}</h3>
              <p className="mt-3 leading-relaxed text-eq-muted">{t(`${key}.description`)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
