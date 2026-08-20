'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const NAV = [
  { href: '#producto', key: 'product' },
  { href: '/about', key: 'about' },
  { href: '#equipo', key: 'team' },
  { href: '#proceso', key: 'process' },
  { href: '/regulatory', key: 'regulatory' },
  { href: '#faq', key: 'faq' },
] as const;

export default function LandingHeader() {
  const t = useTranslations('HomePage.Navigation');
  const locale = useLocale();
  const home = `/${locale}`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#09080d]/85 backdrop-blur-md">
      <div className="eq-shell flex h-[72px] items-center justify-between gap-4">
        <a href={home} className="flex items-center gap-2.5">
          <Image
            src="/equitty_isotipo.png"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
            priority
          />
          <Image
            src="/equitty_logo_white.png"
            alt="EQUITTY"
            width={120}
            height={24}
            className="hidden h-6 w-auto object-contain sm:block"
            priority
          />
        </a>

        <nav className="hidden items-center gap-5 text-[13px] font-medium text-eq-muted lg:flex xl:gap-7 xl:text-sm">
          {NAV.map((item) => (
            <a key={item.href} href={`${home}${item.href}`} className="transition-colors hover:text-eq-ink">
              {t(item.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <a
            href={`${home}#espera`}
            className="inline-flex rounded-full bg-eq-brand px-3 py-2 text-xs font-semibold text-white transition hover:bg-eq-brand-strong sm:px-4 sm:text-sm"
          >
            {t('cta')}
          </a>
        </div>
      </div>
    </header>
  );
}
