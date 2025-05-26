"use client";

import { Button } from "@/components/atom/button";
import { Footer } from "@/components/molecules/footer";
import { Header } from "@/components/molecules/header";

export default function Home() {
  return (
    <div style={{ backgroundColor: "black", width: "100%", height: "100vh" }}>
      <Header pageType="sub" mode="dark" />

      <div style={{ width: "100%", height: "150vh" }}>나는야 버튼 입니다.</div>
      <Button variant="tertiary" size="large" state="default">
        나는야 버튼 입니다.
      </Button>

      <Footer />
    </div>
  );
}
