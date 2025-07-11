import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ children, id, className = '' }) => {
  return (
    <motion.section
      id={id}
      className={`py-20 md:py-32 px-4 sm:px-8 lg:px-16 ${className}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto font-sans">
        {children}
      </div>
    </motion.section>
  );
};
