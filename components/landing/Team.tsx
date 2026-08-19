'use client';

import { useTranslations } from 'next-intl';
import SectionHeading from '@/components/landing/SectionHeading';
import TeamAvatar from '@/components/landing/TeamAvatar';

const TEAM_SLUGS = ['martin', 'jose', 'mario', 'oscar'] as const;
const BOARD_SLUGS = ['sigfredo', 'joseLuis', 'erick', 'ricardo'] as const;

const teamPhotos: Record<string, string | undefined> = {
  martin: '/team/martin.webp',
  mario: '/team/mario.webp',
  oscar: '/team/oscar.webp',
};

const teamPhotoPositions: Record<string, string> = {
  oscar: 'center 10%',
  jose: 'center 18%',
  martin: 'center 15%',
};

const boardPhotos: Record<string, string | undefined> = {
  sigfredo: '/team/sigfredo.webp',
  joseLuis: '/team/joseLuis.webp',
  erick: '/team/erick.webp',
};

export default function Team() {
  const t = useTranslations('HomePage.Team');

  return (
    <section id="equipo" className="bg-eq-paper py-20 sm:py-28">
      <div className="eq-shell">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <article className="marketplace-card p-6">
            <p className="eq-text-small text-eq-brand">{t('missionTitle')}</p>
            <p className="mt-3 text-sm leading-relaxed text-eq-muted">{t('missionText')}</p>
          </article>
          <article className="marketplace-card p-6">
            <p className="eq-text-small text-eq-brand">{t('whyTitle')}</p>
            <p className="mt-3 text-sm leading-relaxed text-eq-muted">{t('whyText')}</p>
          </article>
        </div>

        <h3 className="mt-14 text-2xl tracking-tight text-eq-ink">{t('foundingTitle')}</h3>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {TEAM_SLUGS.map((slug) => (
            <article key={slug} className="group/card marketplace-card flex h-full flex-col items-center p-6 text-center">
              <TeamAvatar
                name={t(`members.${slug}.name`)}
                src={teamPhotos[slug]}
                size="md"
                objectPosition={teamPhotoPositions[slug]}
              />
              <h4 className="mt-4 text-lg font-semibold text-eq-ink">{t(`members.${slug}.name`)}</h4>
              <p className="eq-text-small mt-1 text-eq-brand">{t(`members.${slug}.role`)}</p>
              <p className="mt-3 text-sm leading-relaxed text-eq-muted">{t(`members.${slug}.bio`)}</p>
              <p className="mt-auto pt-4 text-xs leading-relaxed text-white/45">{t(`members.${slug}.signal`)}</p>
            </article>
          ))}
        </div>

        <h3 className="mt-16 text-2xl tracking-tight text-eq-ink">{t('boardTitle')}</h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-eq-muted">{t('boardIntro')}</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {BOARD_SLUGS.map((slug) => (
            <article key={slug} className="group/card marketplace-card flex h-full flex-col items-center p-6 text-center">
              <TeamAvatar name={t(`advisors.${slug}.name`)} src={boardPhotos[slug]} size="sm" />
              <h4 className="mt-3 text-base font-semibold text-eq-ink">{t(`advisors.${slug}.name`)}</h4>
              <p className="eq-text-small mt-1 text-eq-brand">{t(`advisors.${slug}.role`)}</p>
              <p className="mt-3 text-sm leading-relaxed text-eq-muted">{t(`advisors.${slug}.bio`)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
