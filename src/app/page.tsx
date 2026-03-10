import { HeroSection } from '@/components/home/HeroSection';
import { MissionSection } from '@/components/home/MissionSection';
import { PathsSection } from '@/components/home/PathsSection';
import { FeaturedProperty } from '@/components/home/FeaturedProperty';
import { MediaSection } from '@/components/home/MediaSection';
import { RaffleCallout } from '@/components/home/RaffleCallout';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <PathsSection />
      <FeaturedProperty />
      <MediaSection />
      <RaffleCallout />
    </>
  );
}