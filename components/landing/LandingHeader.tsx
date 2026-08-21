'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
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
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#09080d]/85 backdrop-blur-md">
      <div className="eq-shell flex h-16 items-center justify-between gap-3 sm:h-[72px] sm:gap-4">
        <a href={home} className="flex min-w-0 items-center gap-2.5">
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

        <nav className="hidden items-center gap-4 text-[13px] font-medium text-eq-muted xl:flex xl:gap-7 xl:text-sm">
          {NAV.map((item) => (
            <a key={item.href} href={`${home}${item.href}`} className="transition-colors hover:text-eq-ink">
              {t(item.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <a
            href={`${home}#espera`}
            className="inline-flex rounded-full bg-eq-brand px-2.5 py-2 text-[11px] font-semibold text-white shadow-[0_0_18px_rgba(0,180,196,0.35)] transition hover:bg-eq-brand-strong sm:px-4 sm:text-sm"
          >
            {t('cta')}
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-eq-ink xl:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? t('closeMenu') : t('openMenu')}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-white/10 bg-[#09080d]/95 px-4 py-4 backdrop-blur-md xl:hidden">
          <div className="eq-shell grid gap-1">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={`${home}${item.href}`}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-eq-muted transition hover:bg-white/5 hover:text-eq-ink"
              >
                {t(item.key)}
              </a>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
