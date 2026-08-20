import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ContentCard, ContentSection } from '@/components/landing/ContentSection';
import NewsletterForm from '@/components/landing/NewsletterForm';
import PageShell from '@/components/landing/PageShell';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Updates' });
  return {
    title: `EQUITTY | ${t('heroTitle')}`,
    description: t('heroSubtitle'),
  };
}

const updateCardSlugs = ['regulatory', 'product', 'ecosystem'] as const;

export default async function UpdatesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Updates' });

  return (
    <PageShell>
      <ContentSection className="pt-10 sm:pt-14" title={t('heroTitle')} description={t('heroSubtitle')} />
      <ContentSection title={t('introTitle')} description={t('introBody')}>
        <div className="grid gap-4 md:grid-cols-3">
          {updateCardSlugs.map((slug) => (
            <ContentCard key={slug}>
              <p className="eq-text-small text-eq-brand">{t(`cards.${slug}.title`)}</p>
              <p className="mt-3 text-sm leading-relaxed text-eq-muted">{t(`cards.${slug}.body`)}</p>
            </ContentCard>
          ))}
        </div>
      </ContentSection>
      <ContentSection>
        <NewsletterForm />
      </ContentSection>
    </PageShell>
  );
}
