import LandingFooter from '@/components/landing/LandingFooter';
import LandingHeader from '@/components/landing/LandingHeader';

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-eq-canvas text-eq-ink">
      <LandingHeader />
      <main>{children}</main>
      <LandingFooter />
    </div>
  );
}
