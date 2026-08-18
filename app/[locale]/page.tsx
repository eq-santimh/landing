import AssetClasses from '@/components/landing/AssetClasses';
import Benefits from '@/components/landing/Benefits';
import Faq from '@/components/landing/Faq';
import FinalCta from '@/components/landing/FinalCta';
import Hero from '@/components/landing/Hero';
import HowItWorks from '@/components/landing/HowItWorks';
import LandingFooter from '@/components/landing/LandingFooter';
import LandingHeader from '@/components/landing/LandingHeader';
import ProductPreview from '@/components/landing/ProductPreview';
import StatsSection from '@/components/landing/StatsSection';
import TrustBar from '@/components/landing/TrustBar';

export default function Home() {
  return (
    <div id="top" className="min-h-dvh bg-eq-canvas text-eq-ink">
      <LandingHeader />
      <main>
        <Hero />
        <TrustBar />
        <StatsSection />
        <ProductPreview />
        <AssetClasses />
        <HowItWorks />
        <Benefits />
        <Faq />
        <FinalCta />
      </main>
      <LandingFooter />
    </div>
  );
}
