import React from 'react';
import { motion } from 'framer-motion';
import { ESSAYS_DATA } from '../constants';

interface EssaysProps {
    essays: typeof ESSAYS_DATA;
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

const EssayItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <motion.li variants={itemVariants} className="flex items-start">
        <span className="text-brand-primary mr-3 mt-1">&#10148;</span>
        <span className="font-source-code text-brand-secondary">{children}</span>
    </motion.li>
);

export const Essays: React.FC<EssaysProps> = ({ essays }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={listVariants}
                className="p-8 rounded-lg bg-brand-bg/80 backdrop-blur-lg border border-brand-border"
            >
                <h3 className="font-orbitron text-2xl text-brand-light mb-6 border-b border-brand-border pb-3">// DRAFT PIPELINE 1</h3>
                <ul className="space-y-3">
                    {essays.planned.map(title => <EssayItem key={title}>{title}</EssayItem>)}
                </ul>
            </motion.div>
             <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={listVariants}
                className="p-8 rounded-lg bg-brand-bg/80 backdrop-blur-lg border border-brand-border"
            >
                <h3 className="font-orbitron text-2xl text-brand-light mb-6 border-b border-brand-border pb-3">// DRAFT PIPELINE 2 </h3>
                 <ul className="space-y-3">
                    {essays.drafts.map(title => <EssayItem key={title}>{title}</EssayItem>)}
                </ul>
            </motion.div>
        </div>
    );
};