import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Compliance from '@/components/landing/Compliance';
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

export default async function RegulatoryPage() {
  return (
    <PageShell>
      <Compliance />
    </PageShell>
  );
}
