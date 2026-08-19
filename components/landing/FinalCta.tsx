'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import ProductFrame from '@/components/landing/ProductFrame';

export default function FinalCta() {
  const t = useTranslations('HomePage.FinalCta');
  const locale = useLocale();

  return (
    <section className="border-t border-white/10 bg-[#0c0c16] py-20 text-[#f6f3ee] sm:py-24">
      <div className="eq-shell grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <p className="eq-text-small text-eq-brand">{t('eyebrow')}</p>
          <h2 className="mt-3 text-3xl tracking-tight sm:text-5xl">{t('title')}</h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-[#d7cfc7]">{t('subtitle')}</p>
          <a
            href={`/${locale}#espera`}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-eq-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-eq-brand-strong"
          >
            {t('cta')}
          </a>
        </div>
        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-[28px] bg-[#00b4c4]/20 blur-3xl" />
          <ProductFrame src="/product/marketplace-grid.webp" alt={t('shotAlt')} url="equitty.app/marketplace" />
          <div className="mt-4 flex items-center gap-2 text-xs text-[#d7cfc7]">
            <Image src="/equitty_isotipo.png" alt="" width={16} height={16} className="h-4 w-4" />
            {t('caption')}
          </div>
        </div>
      </div>
    </section>
  );
}
