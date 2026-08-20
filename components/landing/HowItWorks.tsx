'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Gift, Globe2, LayoutGrid, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import NeonIcon from '@/components/landing/NeonIcon';
import SectionHeading from '@/components/landing/SectionHeading';
import { cn } from '@/lib/utils';

const STEPS = [
  { key: 'step1', icon: Globe2, accent: 'cyan' },
  { key: 'step2', icon: Mail, accent: 'violet' },
  { key: 'step3', icon: Gift, accent: 'amber' },
  { key: 'step4', icon: LayoutGrid, accent: 'emerald' },
] as const;

export default function HowItWorks() {
  const t = useTranslations('HomePage.HowItWorks');
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.82', 'end 0.45'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });
  const lineWidth = useTransform(progress, [0, 1], ['0%', '100%']);

  return (
    <section id="proceso" className="bg-eq-canvas py-16 sm:py-20 lg:py-28">
      <div className="eq-shell">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

        <div ref={trackRef} className="relative mt-10 sm:mt-12">
          <div className="pointer-events-none absolute top-5 bottom-5 left-5 w-px overflow-hidden bg-white/10 lg:hidden">
            <motion.div
              className="h-full origin-top bg-eq-brand shadow-[0_0_14px_rgba(0,180,196,0.8)]"
              style={{ scaleY: reduceMotion ? 1 : progress }}
            />
          </div>
          <div className="pointer-events-none absolute top-[22px] right-[8%] left-[8%] hidden h-[2px] overflow-hidden rounded-full bg-white/10 lg:block">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-eq-brand shadow-[0_0_16px_rgba(0,180,196,0.85)]"
              style={{ width: reduceMotion ? '100%' : lineWidth }}
            />
          </div>

          <ol className="grid list-none gap-8 p-0 lg:grid-cols-4 lg:gap-5">
            {STEPS.map((step, index) => (
              <motion.li
                key={step.key}
                className="relative pl-14 lg:pl-0"
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-12% 0px' }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="absolute top-0 left-0 z-10 lg:relative lg:mb-5 lg:flex lg:justify-center">
                  <span
                    className={cn(
                      'relative flex',
                      'after:absolute after:inset-[-6px] after:rounded-[22px] after:border after:border-eq-brand/20 after:content-[""]',
                    )}
                  >
                    <NeonIcon icon={step.icon} accent={step.accent} />
                  </span>
                </div>
                <article className="eq-glass-panel p-5 sm:p-6">
                  <p className="financial-figure text-2xl text-eq-brand sm:text-3xl">{`0${index + 1}`}</p>
                  <h3 className="mt-3 text-lg font-semibold text-eq-ink sm:mt-4 sm:text-xl">{t(`${step.key}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-eq-muted sm:mt-3">{t(`${step.key}.description`)}</p>
                </article>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
