import { AvailabilityBanner } from "@/components/AvailabilityBanner";
import { About } from "@/components/About";
import { BulkOrders } from "@/components/BulkOrders";
import { CommunityCTA } from "@/components/CommunityCTA";
import { Delivery } from "@/components/Delivery";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Menu } from "@/components/Menu";
import { MessengerButton } from "@/components/MessengerButton";
import { MobileQuickActions } from "@/components/MobileQuickActions";
import { OpeningHours } from "@/components/OpeningHours";
import { PriceList } from "@/components/PriceList";
import { FacebookUpdates } from "@/components/FacebookUpdates";
import { SocialProofStrip } from "@/components/SocialProofStrip";
import { MainShell } from "@/components/MainShell";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <AvailabilityBanner />
      <MainShell>
        <Hero />
        <SocialProofStrip />
        <OpeningHours />
        <Menu />
        <PriceList />
        <About />
        <FacebookUpdates />
        <BulkOrders />
        <HowItWorks />
        <Delivery />
        <Testimonials />
        <CommunityCTA />
        <FAQ />
      </MainShell>
      <Footer />
      <MobileQuickActions />
      <MessengerButton />
    </>
  );
}
