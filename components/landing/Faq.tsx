'use client';

import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import SectionHeading from '@/components/landing/SectionHeading';

export default function Faq() {
  const t = useTranslations('HomePage.Faq');
  const [openIndex, setOpenIndex] = useState(0);
  const faqKeys = ['item1', 'item2', 'item3', 'item4'] as const;

  return (
    <section id="faq" className="bg-eq-canvas py-20 sm:py-28">
      <div className="eq-shell">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {faqKeys.map((key, index) => {
            const open = openIndex === index;
            return (
              <article key={key} className="marketplace-card overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-lg font-semibold text-eq-ink">{t(`${key}.question`)}</span>
                  {open ? (
                    <Minus className="h-5 w-5 shrink-0 text-eq-brand" />
                  ) : (
                    <Plus className="h-5 w-5 shrink-0 text-eq-brand" />
                  )}
                </button>
                {open ? (
                  <div className="border-t border-eq-line px-6 py-5 text-sm leading-relaxed text-eq-muted">
                    {t(`${key}.answer`)}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
