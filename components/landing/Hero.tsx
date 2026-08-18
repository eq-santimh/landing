'use client';

import { useTranslations } from 'next-intl';
import ComingSoonBadge from '@/components/landing/ComingSoonBadge';
import ProductFrame from '@/components/landing/ProductFrame';
import WaitlistForm from '@/components/HeroSection/WaitlistForm';

export default function Hero() {
  const t = useTranslations('HomePage');

  return (
    <section className="relative overflow-hidden bg-eq-canvas pt-10 pb-16 sm:pt-14 sm:pb-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top_right,rgba(0,180,196,0.12),transparent_55%)]" />
      <div className="eq-shell relative grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <div className="max-w-xl">
          <ComingSoonBadge label={t('badge')} />
          <p className="eq-text-small mt-6 text-eq-brand">{t('kicker')}</p>
          <h1 className="mt-3 text-4xl leading-[1.08] tracking-tight text-eq-ink sm:text-5xl lg:text-[3.5rem]">
            {t('hero_title')}{' '}
            <span className="text-gradient">{t('hero_title_highlight')}</span>
          </h1>
          <p className="eq-text-body mt-5 max-w-lg text-eq-muted">{t('subhead')}</p>
          <div id="espera" className="mt-8">
            <WaitlistForm tone="light" />
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[28px] bg-[#e6f7f9]/70 blur-2xl" />
          <ProductFrame
            src="/product/marketplace-home.webp"
            alt={t('productShotAlt')}
            priority
          />
        </div>
      </div>
    </section>
  );
}
