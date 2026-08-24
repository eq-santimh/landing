import PageSkeleton from '@/components/landing/PageSkeleton';
import PageShell from '@/components/landing/PageShell';

export default function RegulatoryLoading() {
  return (
    <PageShell>
      <PageSkeleton compact />
    </PageShell>
  );
}
