import Benefits from '@/components/landing/Benefits';
import Compliance from '@/components/landing/Compliance';
import Faq from '@/components/landing/Faq';
import FinalCta from '@/components/landing/FinalCta';
import Hero from '@/components/landing/Hero';
import HowItWorks from '@/components/landing/HowItWorks';
import LandingFooter from '@/components/landing/LandingFooter';
import LandingHeader from '@/components/landing/LandingHeader';
import ProductPreview from '@/components/landing/ProductPreview';
import Team from '@/components/landing/Team';
import TrustBar from '@/components/landing/TrustBar';

export default function Home() {
  return (
    <div id="top" className="min-h-dvh overflow-x-hidden bg-eq-canvas text-eq-ink">
      <LandingHeader />
      <main>
        <Hero />
        <TrustBar />
        <ProductPreview />
        <Team />
        <HowItWorks />
        <Benefits />
        <Compliance />
        <Faq />
        <FinalCta />
      </main>
      <LandingFooter />
    </div>
  );
}
