"use client";

import { Footer } from "@/components/molecules/footer";
import { Header } from "@/components/molecules/header";
import IntroSection from "./_components/intro-section";
import { useState } from "react";
import { HeroSection, BestSection, ServicesSection, AboutSection, ContactSection } from "./_components";
import { SwitchCase } from "@/components/atom/switch-case";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <IntroSection onEndSplash={() => setShowSplash(false)} />;
  }

  return (
    <div style={{ width: "100%" }}>
      <Header pageType="sub" mode="dark" />
      
      <SwitchCase
        value={showSplash.toString()}
        cases={{
          true: <IntroSection onEndSplash={() => setShowSplash(false)} />,
          false: (
            <>
      <HeroSection />
      <BestSection />
      <ServicesSection />
      <AboutSection />
            </>
          ),
        }}
       />
      <ContactSection />

      <Footer />
    </div>
  );
}
