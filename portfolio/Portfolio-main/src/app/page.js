import {
  About,
  Contact,
  Hero,
  Navbar,
  StarsCanvas,
  Tech,
  Works,
} from "@/components";
import Experience from "@/components/Experience";
import IntroWrapper from "@/components/IntroWrapper";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <IntroWrapper>
      <div>
        <ScrollProgress />
        <Navbar />
        <Hero />
        <div className="bg-primary relative z-[1] h-full">
          <div className="relative z-[1]">
            <About />
            <Experience />
            <div className="overflow-hidden">
              <Tech />
            </div>
            <Works />
            <Contact />
          </div>
          <StarsCanvas />
        </div>
        <Footer />
      </div>
    </IntroWrapper>
  );
}
