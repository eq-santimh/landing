'use client';

import { Facebook, Instagram, Linkedin } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  waitlistTermsFooter,
  waitlistTermsHeader,
  waitlistTermsSections,
} from '@/data/termsContent';

const FACEBOOK_URL = process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://www.facebook.com/profile.php?id=61588660531154';
const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/equitty_/';
const X_URL = process.env.NEXT_PUBLIC_X_URL || 'https://x.com/EQUITTY_';
const TIKTOK_URL = process.env.NEXT_PUBLIC_TIKTOK_URL || 'https://www.tiktok.com/@equitty_';
const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/company/equitty0';

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 1200 1227" aria-hidden>
      <path
        fill="currentColor"
        d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"
      />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const socials = [
  { href: LINKEDIN_URL, label: 'LinkedIn', icon: Linkedin },
  { href: X_URL, label: 'X (Twitter)', icon: TwitterIcon },
  { href: TIKTOK_URL, label: 'TikTok', icon: TikTokIcon },
  { href: INSTAGRAM_URL, label: 'Instagram', icon: Instagram },
  { href: FACEBOOK_URL, label: 'Facebook', icon: Facebook },
];

export default function LandingFooter() {
  const t = useTranslations('HomePage.Footer');
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <footer className="border-t border-white/10 bg-[#05040a]">
      <div className="eq-shell py-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Image src="/equitty_logo_white.png" alt="EQUITTY" width={140} height={32} className="h-8 w-auto" />
            <p className="mt-3 max-w-sm text-sm text-eq-muted">{t('tagline')}</p>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <Dialog open={isTermsOpen} onOpenChange={setIsTermsOpen}>
              <DialogTrigger asChild>
                <button type="button" className="text-eq-muted transition hover:text-eq-brand">
                  {t('terms')}
                </button>
              </DialogTrigger>
              <DialogContent className="max-h-[85vh] w-[min(96vw,920px)] max-w-[min(96vw,920px)] overflow-hidden border-white/10 bg-[#14131c] sm:max-w-[min(74vw,920px)]">
                <DialogHeader>
                  <DialogTitle className="text-eq-ink">{t('termsModalTitle')}</DialogTitle>
                  <DialogDescription className="text-eq-muted">{t('termsModalDescription')}</DialogDescription>
                </DialogHeader>
                <div className="mt-2 max-h-[60vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#09080d] p-6 text-sm leading-relaxed text-eq-ink">
                  <div className="space-y-1 text-[13px] tracking-[0.2em] text-eq-muted uppercase">
                    {waitlistTermsHeader.map((line, index) => (
                      <p key={`${line}-${index}`}>{line}</p>
                    ))}
                  </div>
                  <div className="mt-4 space-y-6">
                    {waitlistTermsSections.map((section) => (
                      <article key={section.title} className="space-y-2 border-t border-eq-line pt-4 first:border-t-0 first:pt-0">
                        <p className="eq-text-small text-eq-brand">{section.title}</p>
                        <p className="whitespace-pre-line leading-relaxed text-eq-muted">{section.body}</p>
                      </article>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-eq-muted">{waitlistTermsFooter}</p>
                </div>
              </DialogContent>
            </Dialog>
            <div className="h-4 w-px bg-eq-line" />
            <span className="text-eq-muted">{t('privacy')}</span>
          </div>

          <div className="flex items-center gap-4">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-eq-muted transition-colors hover:text-eq-brand"
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-eq-line pt-6 text-xs text-eq-muted">
          <p>{t('regulated')}</p>
          <p className="mt-2">{t('footerDisclaimer')}</p>
        </div>
      </div>
    </footer>
  );
}
