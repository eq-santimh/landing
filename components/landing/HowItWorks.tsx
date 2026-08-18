'use client';

import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import SectionHeading from '@/components/landing/SectionHeading';

export default function HowItWorks() {
  const t = useTranslations('HomePage.HowItWorks');
  const stepKeys = ['step1', 'step2', 'step3', 'step4'] as const;

  return (
    <section id="proceso" className="bg-eq-canvas py-20 sm:py-28">
      <div className="eq-shell">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {stepKeys.map((key, index) => (
            <article key={key} className="relative marketplace-card p-6">
              <div className="financial-figure text-3xl text-eq-brand">{`0${index + 1}`}</div>
              <h3 className="mt-5 text-xl font-semibold text-eq-ink">{t(`${key}.title`)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-eq-muted">{t(`${key}.description`)}</p>
              {index < 3 ? (
                <div className="absolute top-1/2 -right-3 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-eq-brand/30 bg-[#14131c] text-eq-brand lg:flex">
                  <ArrowRight className="h-4 w-4" />
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
