'use client';

import { BadgeCheck, Landmark, LineChart, Waypoints } from 'lucide-react';
import { useTranslations } from 'next-intl';
import NeonIcon from '@/components/landing/NeonIcon';
import SectionHeading from '@/components/landing/SectionHeading';

const BENEFITS = [
  { key: 'item1', icon: Landmark, accent: 'amber' },
  { key: 'item2', icon: LineChart, accent: 'cyan' },
  { key: 'item3', icon: Waypoints, accent: 'emerald' },
  { key: 'item4', icon: BadgeCheck, accent: 'violet' },
] as const;

export default function Benefits() {
  const t = useTranslations('HomePage.Benefits');

  return (
    <section className="relative overflow-hidden bg-eq-paper py-16 sm:py-20 lg:py-28">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-eq-brand/15 blur-3xl" />
      <div className="pointer-events-none absolute right-[-10%] bottom-0 h-56 w-56 rounded-full bg-violet-500/15 blur-3xl" />
      <div className="eq-shell relative">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

        <div className="mt-10 grid gap-4 sm:mt-12 md:grid-cols-2">
          {BENEFITS.map((item) => (
            <article
              key={item.key}
              className="eq-glass-neon group/benefit p-5 sm:p-7"
            >
              <NeonIcon icon={item.icon} accent={item.accent} />
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-eq-ink sm:text-2xl">
                {t(`${item.key}.title`)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-eq-muted sm:text-base">
                {t(`${item.key}.description`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
