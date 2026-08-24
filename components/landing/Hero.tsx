'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import ComingSoonBadge from '@/components/landing/ComingSoonBadge';
import HeroAsciiMark from '@/components/landing/HeroAsciiMark';
import WaitlistForm from '@/components/HeroSection/WaitlistForm';
import ProductFrame from '@/components/landing/ProductFrame';
import { SHOW_PLATFORM_SHOTS, SHOW_WAITLIST } from '@/lib/landingFlags';

export default function Hero() {
  const t = useTranslations('HomePage');
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden bg-eq-canvas pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-20">
      <div className="pointer-events-none absolute -top-24 right-[-20%] h-72 w-72 rounded-full bg-[#7ee7f0]/20 blur-3xl sm:h-96 sm:w-96" />
      <div className="pointer-events-none absolute top-32 left-[-15%] h-64 w-64 rounded-full bg-violet-500/15 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top_right,rgba(0,180,196,0.16),transparent_55%)]" />

      <div className="eq-shell relative grid items-start gap-8 xl:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] xl:items-center xl:gap-12">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            {SHOW_WAITLIST ? <ComingSoonBadge label={t('badge')} variant="waitlist" /> : null}
            <ComingSoonBadge label={t('applicationPendingBadge')} variant="regulatory" />
          </div>
          <p className="eq-text-small mt-5 text-eq-brand sm:mt-6">{t('kicker')}</p>
          <h1 className="mt-3 text-[1.75rem] leading-[1.12] tracking-tight text-eq-ink sm:text-4xl lg:text-[2.75rem] xl:text-[3.15rem]">
            {t('hero_title')}{' '}
            <span className="text-gradient">{t('hero_title_highlight')}</span>
          </h1>
          <p className="eq-text-body mt-4 max-w-lg text-sm text-eq-muted sm:mt-5 sm:text-base">{t('subhead')}</p>
          {SHOW_WAITLIST ? (
            <div id="espera" className="mt-6 scroll-mt-24 sm:mt-8">
              <Suspense fallback={<div className="h-[320px] rounded-2xl border border-eq-brand/20 bg-white/5" />}>
                <WaitlistForm tone="dark" />
              </Suspense>
            </div>
          ) : (
            <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
              <Link
                href={`/${locale}#cumplimiento`}
                className="eq-neon-cta inline-flex h-11 items-center justify-center rounded-full bg-eq-brand px-5 text-sm font-semibold text-white transition hover:bg-eq-brand-strong"
              >
                {t('heroSecondaryCta')}
              </Link>
              <Link
                href={`/${locale}#equipo`}
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 px-5 text-sm font-semibold text-eq-ink transition hover:border-eq-brand/50 hover:text-white"
              >
                {t('heroTertiaryCta')}
              </Link>
            </div>
          )}
        </div>

        <div className="relative min-w-0">
          <div className="absolute -inset-4 -z-10 rounded-[28px] bg-[#00b4c4]/20 blur-3xl sm:-inset-6" />
          {SHOW_PLATFORM_SHOTS ? (
            <ProductFrame
              src="/product/marketplace-home.webp"
              alt={t('productShotAlt')}
              priority
              className="hero-product-frame"
            />
          ) : (
            <HeroAsciiMark className="hero-ascii-frame aspect-square w-full max-w-[560px] xl:ml-auto" label={t('heroArtAlt')} />
          )}
        </div>
      </div>
    </section>
  );
}
