import React from 'react';
import { motion } from 'framer-motion';
import styles from './CaseStudiesSection.module.css';

interface Stat {
  value: string;
  label: string;
}

interface CaseStudyCardProps {
  image: string;
  category: string;
  title: string;
  description: string;
  stats: Stat[];
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  image,
  category,
  title,
  description,
  stats
}) => {
  return (
    <motion.div 
      className={`${styles.card} view-more-trigger`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
        <div className={styles.overlay}>
        </div>
      </div>
      <div className={styles.content}>
        <span className={styles.cardType}>{category}</span>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDesc}>{description}</p>
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
