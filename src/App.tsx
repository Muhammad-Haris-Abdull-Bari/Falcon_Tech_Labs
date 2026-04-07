import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

// Register plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

import { Navbar } from './components/Navbar/Navbar';
import { Cursor } from './components/Cursor/Cursor';
import { Hero } from './components/Hero/Hero';
import { Marquee } from './components/Marquee/Marquee';
import { SectionDark } from './components/SectionDark/SectionDark';
import { Footer } from './components/Footer/Footer';
import { Background3D } from './components/Background3D/Background3D';
import { ExperienceSection } from './components/ExperienceSection/ExperienceSection';

const App: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Setup ScrollSmoother
    let smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#scroll-content',
      smooth: 1.5,
      effects: true,
      normalizeScroll: true, // Recommended for better cross-browser syncing
    });

    let skew = 0;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const handleScroll = () => {
      if (!contentRef.current || !smoother) return;

      // Use visual velocity from ScrollSmoother instead of instant window.scrollY
      const velocity = smoother.getVelocity();

      const maxSkew = 5.0;
      // Adjust velocity multiplier since smoother.getVelocity() values are different than raw delta
      const speed = Math.min(Math.max(velocity * -0.002, -maxSkew), maxSkew);

      skew = lerp(skew, speed, 0.1);

      if (Math.abs(skew) > 0.01) {
        gsap.set(contentRef.current, { skewY: skew, transformOrigin: 'center center' });
      } else {
        gsap.set(contentRef.current, { skewY: 0 });
      }
    };

    gsap.ticker.add(handleScroll);

    return () => {
      gsap.ticker.remove(handleScroll);
      smoother.kill();
    };
  }, []);

  return (
    <>
      {/* Noise Overlay */}
      <div className="noise"></div>

      {/* Custom Cursor */}
      <Cursor />

      {/* 3D Background System */}
      <Background3D />

      {/* Navigation */}
      <Navbar />

      <div id="smooth-wrapper">
        <div id="scroll-content" ref={contentRef}>
          {/* Main Content Sections */}
          <Hero />
          <Marquee />

          <SectionDark align="left">
            WE BUILD <span>DIGITAL EXPERIENCES</span> THAT DEFY GRAVITY. NO TEMPLATES. NO LIMITS. JUST <span>PURE CODE</span> AND <span>RAW AESTHETICS.</span>
          </SectionDark>

          <SectionDark align="right">
            INTERACTION<br />
            <span>REDEFINED</span>
          </SectionDark>

          <ExperienceSection />

          {/* Footer Section */}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default App;
