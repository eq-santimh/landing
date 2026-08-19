'use client';

import { useTranslations } from 'next-intl';
import ProductFrame from '@/components/landing/ProductFrame';
import SectionHeading from '@/components/landing/SectionHeading';

export default function ProductPreview() {
  const t = useTranslations('HomePage.Product');
  const points = ['point1', 'point2', 'point3'] as const;

  return (
    <section id="producto" className="bg-eq-canvas py-20 sm:py-28">
      <div className="eq-shell grid items-center gap-12 lg:grid-cols-2">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
        <div className="space-y-4">
          {points.map((key) => (
            <article key={key} className="marketplace-card p-5">
              <p className="eq-text-small text-eq-brand">{t(`${key}.label`)}</p>
              <h3 className="eq-text-title mt-2 text-xl text-eq-ink">{t(`${key}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-eq-muted">{t(`${key}.description`)}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="eq-shell mt-12">
        <ProductFrame src="/product/property-cards.webp" alt={t('cardsAlt')} url="equitty.app/marketplace" />
      </div>
    </section>
  );
}
