'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import SectionHeading from '@/components/landing/SectionHeading';

const CLASSES = [
  { key: 'all', tone: 'bg-[#00b4c4]/15 text-[#7ee7f0]' },
  { key: 'hospitality', tone: 'bg-[#c2410c]/25 text-[#fdba74]' },
  { key: 'residential', tone: 'bg-[#b45309]/25 text-[#fcd34d]' },
  { key: 'commercial', tone: 'bg-[#2f5c98]/30 text-[#93c5fd]' },
  { key: 'energy', tone: 'bg-[#047857]/25 text-[#6ee7b7]' },
  { key: 'infra', tone: 'bg-[#6d28d9]/25 text-[#c4b5fd]' },
] as const;

export default function AssetClasses() {
  const t = useTranslations('HomePage.Assets');
  const [active, setActive] = useState<(typeof CLASSES)[number]['key']>('all');

  return (
    <section id="activos" className="bg-eq-paper py-20 sm:py-28">
      <div className="eq-shell">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-eq-line">
          {CLASSES.map((item) => {
            const isActive = active === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setActive(item.key)}
                className={`relative pb-3 text-sm font-semibold transition-colors ${
                  isActive ? 'text-eq-brand' : 'text-eq-muted hover:text-eq-ink'
                }`}
              >
                {t(`filters.${item.key}`)}
                {isActive ? <span className="absolute inset-x-0 -bottom-px h-0.5 bg-eq-brand" /> : null}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CLASSES.filter((item) => item.key !== 'all')
            .filter((item) => active === 'all' || active === item.key)
            .map((item) => (
              <article key={item.key} className="marketplace-card overflow-hidden">
                <div className={`flex h-36 items-end justify-between px-5 py-4 ${item.tone}`}>
                  <span className="rounded-full bg-black/35 px-3 py-1 text-[11px] font-semibold tracking-[0.14em] uppercase">
                    {t(`filters.${item.key}`)}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-eq-ink">{t(`${item.key}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-eq-muted">{t(`${item.key}.description`)}</p>
                  <div className="mt-5 grid grid-cols-3 gap-3 border-t border-eq-line pt-4 text-xs">
                    <div>
                      <p className="eq-text-small text-eq-muted">{t('metrics.access')}</p>
                      <p className="financial-figure mt-1 text-eq-brand">{t('metrics.accessValue')}</p>
                    </div>
                    <div>
                      <p className="eq-text-small text-eq-muted">{t('metrics.structure')}</p>
                      <p className="mt-1 font-semibold text-eq-ink">{t('metrics.structureValue')}</p>
                    </div>
                    <div>
                      <p className="eq-text-small text-eq-muted">{t('metrics.status')}</p>
                      <p className="mt-1 font-semibold text-[#fdba74]">{t('metrics.statusValue')}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
