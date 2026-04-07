import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ExperienceSection.css';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: '10+', label: 'Years of Experience' },
  { number: '200+', label: 'Successful Projects' },
  { number: '150+', label: 'Happy Clients' },
  { number: '160', label: '5 Star Reviews' },
];

const cards = [
  {
    title: 'Proven Track Record',
    description: 'We have successfully delivered web, app, marketing, and AI solutions to clients across industries.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-4 5-4" />
        <path d="M12 15v5s3.03-.55 5-2c2.2-1.62 4-5 4-5" />
      </svg>
    ),
  },
  {
    title: 'Tailored Solutions',
    description: 'We create custom software, design, and marketing strategies aligned with your business goals.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    title: 'Client-Centric Focus',
    description: 'Your growth is our priority. We focus on solutions that maximize your ROI and impact.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <polyline points="16 11 18 13 22 9" />
      </svg>
    ),
  },
];

const badges = [
  'Continuous Innovation',
  'Dedicated Support',
  'Positive Client Experiences',
  'Commitment to Excellence',
];

export const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ballRef.current || !sectionRef.current) return;

    // Ball movement animation based on scroll
    gsap.to(ballRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
      x: '30vw',
      y: '50vh',
      scale: 1.5,
      opacity: 0.3,
      duration: 1,
      ease: 'power2.inOut',
    });
  }, { scope: sectionRef });

  return (
    <section className="experience-section" ref={sectionRef}>
      <div className="experience-bg">
        <img
          src="/Images_&_Videos/ExperienceSection.jpg"
          alt="Modern Workspace"
        />
        <div className="experience-overlay" />
      </div>

      <div className="floating-ball" ref={ballRef} />

      {/* Stats Circles */}
      <div className="stats-container">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="stat-circle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="stat-number">{stat.number}</span>
            <span className="stat-label">{stat.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Glass Cards */}
      <div className="cards-grid">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className="glass-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="card-icon">
              {card.icon}
            </div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Badges */}
      <div className="badges-container">
        {badges.map((text, index) => (
          <motion.div
            key={index}
            className="badge"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="badge-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" />
              </svg>
            </div>
            {text}
          </motion.div>
        ))}
      </div>
    </section>
  );
};
