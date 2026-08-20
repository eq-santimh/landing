'use client';

import { Suspense } from 'react';
import { useTranslations } from 'next-intl';
import ComingSoonBadge from '@/components/landing/ComingSoonBadge';
import ProductFrame from '@/components/landing/ProductFrame';
import WaitlistForm from '@/components/HeroSection/WaitlistForm';

export default function Hero() {
  const t = useTranslations('HomePage');

  return (
    <section className="relative overflow-hidden bg-eq-canvas pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-20">
      <div className="pointer-events-none absolute -top-24 right-[-20%] h-72 w-72 rounded-full bg-[#7ee7f0]/20 blur-3xl sm:h-96 sm:w-96" />
      <div className="pointer-events-none absolute top-32 left-[-15%] h-64 w-64 rounded-full bg-violet-500/15 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top_right,rgba(0,180,196,0.16),transparent_55%)]" />

      <div className="eq-shell relative grid items-start gap-8 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:items-center lg:gap-12">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <ComingSoonBadge label={t('badge')} variant="waitlist" />
            <ComingSoonBadge label={t('applicationPendingBadge')} variant="regulatory" />
          </div>
          <p className="eq-text-small mt-5 text-eq-brand sm:mt-6">{t('kicker')}</p>
          <h1 className="mt-3 text-[1.85rem] leading-[1.12] tracking-tight text-eq-ink sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            {t('hero_title')}{' '}
            <span className="text-gradient">{t('hero_title_highlight')}</span>
          </h1>
          <p className="eq-text-body mt-4 max-w-lg text-sm text-eq-muted sm:mt-5 sm:text-base">{t('subhead')}</p>
          <div id="espera" className="mt-6 sm:mt-8">
            <Suspense fallback={<div className="h-[320px] rounded-2xl border border-eq-brand/20 bg-white/5" />}>
              <WaitlistForm tone="dark" />
            </Suspense>
          </div>
        </div>

        <div className="relative min-w-0 lg:order-last">
          <div className="absolute -inset-4 -z-10 rounded-[28px] bg-[#00b4c4]/20 blur-3xl sm:-inset-6" />
          <ProductFrame
            src="/product/marketplace-home.webp"
            alt={t('productShotAlt')}
            priority
            className="hero-product-frame"
          />
        </div>
      </div>
    </section>
  );
}
