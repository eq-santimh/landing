'use client';

import LandingFooter from '@/components/landing/LandingFooter';
import LandingHeader from '@/components/landing/LandingHeader';
import UnsubscribeForm from '@/components/UnsubscribeForm';
import { useTranslations } from 'next-intl';

export default function UnsubscribePage() {
  const t = useTranslations('HomePage.Unsubscribe');

  return (
    <div className="min-h-screen bg-eq-canvas text-eq-ink">
      <LandingHeader />
      <section className="eq-shell flex flex-1 items-center justify-center py-16">
        <div className="w-full max-w-xl marketplace-card p-8 sm:p-10">
          <div className="space-y-4 text-center">
            <p className="eq-text-small text-eq-brand">{t('eyebrow')}</p>
            <h1 className="text-3xl text-eq-ink md:text-4xl">{t('title')}</h1>
            <p className="text-base text-eq-muted">{t('description')}</p>
          </div>
          <div className="mt-8">
            <UnsubscribeForm />
          </div>
        </div>
      </section>
      <LandingFooter />
    </div>
  );
}
