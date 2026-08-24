import PageSkeleton from '@/components/landing/PageSkeleton';
import PageShell from '@/components/landing/PageShell';

export default function PlatformLoading() {
  return (
    <PageShell>
      <PageSkeleton compact />
    </PageShell>
  );
}
