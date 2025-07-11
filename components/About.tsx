import React from 'react';
import { motion } from 'framer-motion';
import { ABOUT_DATA } from '../constants';
import { BulletPoint } from './BulletPoint';

interface AboutProps {
    data: typeof ABOUT_DATA;
}

const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
};

const competencyItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};

export const About: React.FC<AboutProps> = ({ data }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 font-source-code">
            <div className="lg:col-span-3">
                <h3 className="font-orbitron text-2xl text-brand-light mb-4">// BIO</h3>
                <p className="text-brand-secondary leading-relaxed">{data.shortBio}</p>
                <div className="mt-8">
                     <h4 className="font-orbitron text-xl text-brand-light mb-4">// OPERATIONAL VALUES</h4>
                     <motion.ul 
                        variants={listVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="space-y-2 text-brand-secondary"
                     >
                        {data.operationalValues.map((value, index) => (
                           <BulletPoint key={index}>{value}</BulletPoint>
                        ))}
                    </motion.ul>
                </div>
            </div>
            <div className="lg:col-span-2">
                <h3 className="font-orbitron text-2xl text-brand-light mb-4">// CORE COMPETENCIES</h3>
                 <motion.ul 
                    variants={listVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="space-y-3 text-brand-secondary"
                 >
                    {data.competencies.map((comp, index) => (
                        <motion.li 
                            key={index} 
                            variants={competencyItemVariants} 
                            className="p-3 rounded-md text-sm bg-brand-bg/60 backdrop-blur-md border border-brand-border text-brand-light"
                        >
                            {comp}
                        </motion.li>
                    ))}
                </motion.ul>
            </div>
        </div>
    );
};