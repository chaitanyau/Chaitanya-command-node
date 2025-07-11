import React from 'react';
import { motion } from 'framer-motion';
import { DEMOS_DATA } from '../constants';

interface DemosProps {
    demos: typeof DEMOS_DATA;
}

const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
};


export const Demos: React.FC<DemosProps> = ({ demos }) => {
    return (
        <motion.div 
            className="p-8 rounded-lg bg-brand-bg/80 backdrop-blur-lg border border-brand-border max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={listVariants}
        >
             <h3 className="font-orbitron text-2xl text-brand-light mb-6 border-b border-brand-border pb-3">// DEMOS AVAILABLE</h3>
            <ul className="space-y-3">
                {demos.available.map((demo) => (
                    <motion.li 
                        key={demo}
                        variants={itemVariants} 
                        className="font-source-code text-brand-secondary"
                    >
                         <span className="text-brand-primary mr-2">&gt;</span>{demo}
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    );
};