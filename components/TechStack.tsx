import React from 'react';
import { motion } from 'framer-motion';
import { TechCategory } from '../types';

interface TechStackProps {
  categories: TechCategory[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const TechStack: React.FC<TechStackProps> = ({ categories }) => {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {categories.map((category) => (
        <motion.div
          key={category.title}
          variants={itemVariants}
          className="p-6 rounded-xl border border-brand-border bg-brand-bg/60 backdrop-blur-md shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out group"
        >
          <h3 className="font-sans text-lg font-semibold text-brand-light mb-4 pb-2 border-b border-brand-border uppercase tracking-wide group-hover:text-brand-accent transition-colors duration-300">
            {category.title}
          </h3>
          <ul className="space-y-2">
            {category.items.map((item) => (
              <li
                key={item}
                className="font-mono text-sm text-brand-secondary group-hover:text-brand-light transition-colors duration-200"
              >
                <span className="text-brand-accent mr-2 font-bold">&gt;</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.div>
  );
};
