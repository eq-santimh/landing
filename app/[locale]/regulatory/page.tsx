import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ContentCard, ContentSection } from '@/components/landing/ContentSection';
import PageShell from '@/components/landing/PageShell';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Regulatory' });
  return {
    title: `EQUITTY | ${t('heroTitle')}`,
    description: t('heroSubtitle'),
  };
}

export default async function RegulatoryPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Regulatory' });

  const pillars = [
    { title: t('pillarOneTitle'), body: t('pillarOneText') },
    { title: t('pillarTwoTitle'), body: t('pillarTwoText') },
    { title: t('pillarThreeTitle'), body: t('pillarThreeText') },
    { title: t('pillarFourTitle'), body: t('pillarFourText') },
  ];

  return (
    <PageShell>
      <ContentSection className="pt-10 sm:pt-14" title={t('heroTitle')} description={t('heroSubtitle')} />
      <ContentSection title={t('architectureTitle')} headingAs="h2">
        <div className="grid gap-4 md:grid-cols-2">
          {pillars.map((pillar) => (
            <ContentCard key={pillar.title}>
              <h3 className="text-lg font-semibold text-eq-ink">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-eq-muted">{pillar.body}</p>
            </ContentCard>
          ))}
        </div>
      </ContentSection>
      <ContentSection title={t('launchTitle')} headingAs="h2">
        <ContentCard>
          <p className="eq-text-small text-eq-brand">{t('launchTitle')}</p>
          <p className="mt-3 text-sm leading-relaxed text-eq-muted">{t('launchBody')}</p>
        </ContentCard>
      </ContentSection>
    </PageShell>
  );
}
