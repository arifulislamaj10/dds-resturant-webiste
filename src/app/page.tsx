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
import { OpeningHours } from "@/components/OpeningHours";
import { FacebookUpdates } from "@/components/FacebookUpdates";
import { SocialProofStrip } from "@/components/SocialProofStrip";
import { Testimonials } from "@/components/Testimonials";
import { getShopStatus } from "@/config/business";

export default function Home() {
  const shopStatus = getShopStatus();

  return (
    <>
      <Header />
      <AvailabilityBanner />
      <main className={`pb-4 ${shopStatus.mode !== "open" ? "pt-10 sm:pt-11" : ""}`}>
        <Hero />
        <SocialProofStrip />
        <OpeningHours />
        <About />
        <FacebookUpdates />
        <Menu />
        <BulkOrders />
        <HowItWorks />
        <Delivery />
        <Testimonials />
        <CommunityCTA />
        <FAQ />
      </main>
      <Footer />
      <MessengerButton />
    </>
  );
}
