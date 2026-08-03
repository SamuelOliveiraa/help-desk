import { Features } from "./components/Features";
import { CtaBanner } from "./components/CtaBanner";
import HeroSection from "./components/HeroSection";
import { Services } from "./components/Services";

export default function Page() {
  return (
    <>
      <HeroSection />
      <Features />
      <Services />
      <CtaBanner />
    </>
  );
}
