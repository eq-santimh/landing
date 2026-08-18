'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const NAV = [
  { href: '#producto', key: 'product' },
  { href: '#activos', key: 'assets' },
  { href: '#proceso', key: 'process' },
  { href: '#faq', key: 'faq' },
] as const;

export default function LandingHeader() {
  const t = useTranslations('HomePage.Navigation');
  const locale = useLocale();
  const home = `/${locale}`;

  return (
    <header className="sticky top-0 z-50 border-b border-eq-line bg-white/90 backdrop-blur-md">
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
            src="/logo-accent.png"
            alt="EQUITTY"
            width={120}
            height={24}
            className="hidden h-6 w-auto object-contain sm:block"
            priority
          />
        </a>

        <nav className="hidden items-center gap-7 text-sm font-medium text-eq-muted lg:flex">
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
            className="hidden rounded-full bg-eq-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-eq-brand-strong sm:inline-flex"
          >
            {t('cta')}
          </a>
        </div>
      </div>
    </header>
  );
}
