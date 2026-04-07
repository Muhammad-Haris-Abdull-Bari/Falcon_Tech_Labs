import React from 'react';
import { motion } from 'framer-motion';
import { CaseStudyCard } from './CaseStudyCard';
import styles from './CaseStudiesSection.module.css';

const caseStudies = [
  {
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=1200', // Architecture
    category: 'SEO STRATEGY',
    title: 'SEO Success story of an Architecture Firm',
    description: 'How ArchVision Architects Achieved Top Rankings with Strategic SEO',
    stats: [
      { value: '60%', label: 'Increase in organic traffic' },
      { value: '#1', label: 'Ranked on the first page' }
    ]
  },
  {
    image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=1200', // Video Production
    category: 'CONTENT',
    title: 'Content Writing For Video Grapher',
    description: 'Elevating visual storytelling through high-impact script writing.',
    stats: [
      { value: '40%', label: 'Increase in website traffic' },
      { value: '70%', label: 'Target keywords ranked' }
    ]
  },
  {
    image: 'https://images.unsplash.com/photo-1558904541-efa8c1965f1e?auto=format&fit=crop&q=80&w=1200', // Landscaping
    category: 'PAID MEDIA',
    title: 'SEO solution for Landscaping Business',
    description: 'Discover how Tech Haven skyrocketed its online sales by 42% with Digital Maven\'s tailored SEO strategy.',
    stats: [
      { value: '60%', label: 'Organic traffic increased' },
      { value: '80%', label: 'Target keywords ranked' }
    ]
  },
  {
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=1200', // Barber shop
    category: 'MARKETING',
    title: 'Transforming Barber Buzz',
    description: 'How Razor Sharp Barbershop Grew its Clientele with Digital Marketing',
    stats: [
      { value: '30%', label: 'New client bookings' },
      { value: '50%', label: 'Local search' }
    ]
  }
];

export const CaseStudiesSection: React.FC = () => {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <motion.span 
          className={styles.subTitle}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          Portfolio
        </motion.span>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Case Studies
        </motion.h2>
      </header>

      <div className={styles.grid}>
        {caseStudies.map((study, index) => (
          <CaseStudyCard 
            key={index}
            {...study}
          />
        ))}
      </div>

      <footer className={styles.footerArea}>
        <motion.button 
          className={styles.viewAllBtn}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          VIEW ALL PROJECTS
        </motion.button>
      </footer>
    </section>
  );
};
