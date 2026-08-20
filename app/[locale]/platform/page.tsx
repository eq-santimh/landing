import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ContentCard, ContentSection } from '@/components/landing/ContentSection';
import PageShell from '@/components/landing/PageShell';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Platform' });
  return {
    title: `EQUITTY | ${t('heroTitle')}`,
    description: t('heroSubtitle'),
  };
}

export default async function PlatformPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Platform' });
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@equitty.com';

  const steps = [
    { title: t('discoverTitle'), body: t('discoverText') },
    { title: t('investTitle'), body: t('investText') },
    { title: t('earnTitle'), body: t('earnText') },
    { title: t('exitTitle'), body: t('exitText') },
  ];

  return (
    <PageShell>
      <ContentSection className="pt-10 sm:pt-14" title={t('heroTitle')} description={t('heroSubtitle')}>
        <ContentCard>
          <h2 className="text-xl tracking-tight text-eq-ink sm:text-2xl">{t('problemTitle')}</h2>
          <p className="mt-3 text-sm leading-relaxed text-eq-muted">{t('problemBody')}</p>
          <p className="mt-3 text-sm leading-relaxed text-eq-muted">{t('problemBodyTwo')}</p>
        </ContentCard>
      </ContentSection>

      <ContentSection title={t('journeyTitle')}>
        <div className="grid gap-4 lg:grid-cols-4">
          {steps.map((step) => (
            <ContentCard key={step.title}>
              <p className="eq-text-small text-eq-brand">{step.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-eq-muted">{step.body}</p>
            </ContentCard>
          ))}
        </div>
        <ContentCard className="mt-6">
          <p className="text-sm text-eq-muted">{t('disclaimer')}</p>
        </ContentCard>
      </ContentSection>

      <ContentSection>
        <ContentCard className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lg text-eq-ink">{t('listingCta')}</p>
          <a
            href={`mailto:${contactEmail}`}
            className="inline-flex rounded-full bg-eq-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-eq-brand-strong"
          >
            {contactEmail}
          </a>
        </ContentCard>
      </ContentSection>
    </PageShell>
  );
}
