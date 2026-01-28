import HeroSection from '@/components/HeroSection';
import StatsTicker from '@/components/home/StatsTicker';
import ProgramsGrid from '@/components/home/ProgramsGrid';
import PricingSection from '@/components/home/PricingSection';
import WhyUs from '@/components/home/WhyUs';

import Testimonials from '@/components/home/Testimonials';
import CtaBanner from '@/components/home/CtaBanner';

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <HeroSection />
      <StatsTicker />
      <WhyUs />
      <ProgramsGrid />
      <PricingSection />
      <Testimonials />
      <CtaBanner />
    </main>
  );
}
