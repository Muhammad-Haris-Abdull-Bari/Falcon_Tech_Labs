import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import './SectionDark.css';

interface SectionDarkProps {
  children: React.ReactNode;
  align?: 'left' | 'right';
}

gsap.registerPlugin(ScrollTrigger, SplitText);

export const SectionDark: React.FC<SectionDarkProps> = ({ children, align = 'left' }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    let outerSplits: SplitText[] = [];
    let innerSplits: SplitText[] = [];
    let animations: gsap.core.Tween[] = [];

    const initAnimation = async () => {
      // Ensure animation runs only after fonts are fully loaded
      await document.fonts.ready;

      // Revert previous splits and kill previous animations on resize recalculation
      animations.forEach((anim) => anim.kill());
      animations = [];
      
      innerSplits.forEach((split) => split.revert());
      outerSplits.forEach((split) => split.revert());
      innerSplits = [];
      outerSplits = [];

      const splitElements = gsap.utils.toArray('.split');

      splitElements.forEach((el: any) => {
        // Double split for "inner div inside each line" layout
        const outerSplit = new SplitText(el, { type: 'lines', linesClass: 'split-line' });
        const innerSplit = new SplitText(outerSplit.lines, { type: 'lines', linesClass: 'split-line-inner' });
        
        outerSplits.push(outerSplit);
        innerSplits.push(innerSplit);

        const anim = gsap.fromTo(
          innerSplit.lines,
          { yPercent: 120 },
          {
            yPercent: 0,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              end: 'bottom 60%',
              scrub: true,
            },
          }
        );
        animations.push(anim);
      });
    };

    initAnimation();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initAnimation();
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
      innerSplits.forEach((split) => split.revert());
      outerSplits.forEach((split) => split.revert());
    };
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="section-dark" 
      style={{
        justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
        textAlign: align === 'right' ? 'right' : 'left'
      }}
    >
      <p ref={textRef} className="big-text split">
        {children}
      </p>
    </section>
  );
};
