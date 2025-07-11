import React from 'react';
import { motion } from 'framer-motion';
import { LEARNING_DATA, ASTRONAUT_DATA } from '../constants';
import { BulletPoint } from './BulletPoint';

interface MissionProps {
    learning: typeof LEARNING_DATA;
    astronaut: typeof ASTRONAUT_DATA;
}

const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
};

export const Mission: React.FC<MissionProps> = ({ learning, astronaut }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 font-source-code">
            <div>
                <h3 className="font-orbitron text-2xl text-brand-light mb-4">// LEARNING & DEVELOPMENT</h3>
                <div className="space-y-6">
                    <div>
                        <h4 className="font-orbitron text-lg text-brand-primary/90 mb-2">CURRENT INITIATIVES:</h4>
                        <motion.ul variants={listVariants} whileInView="visible" viewport={{once: true, amount: 0.3}} initial="hidden" className="space-y-2 text-brand-secondary">
                            {learning.currentInitiatives.map(item => <BulletPoint key={item}>{item}</BulletPoint>)}
                        </motion.ul>
                    </div>
                     <div>
                        <h4 className="font-orbitron text-lg text-brand-primary/90 mb-2">CONVERGENCE GOALS:</h4>
                        <motion.ul variants={listVariants} whileInView="visible" viewport={{once: true, amount: 0.3}} initial="hidden" className="space-y-2 text-brand-secondary">
                             {learning.convergenceGoals.map(item => <BulletPoint key={item}>{item}</BulletPoint>)}
                        </motion.ul>
                    </div>
                     <div className="p-4 rounded-md bg-brand-bg/60 backdrop-blur-md border border-brand-border">
                        <h4 className="font-orbitron text-lg text-brand-accent mb-2">9-MONTH GOAL:</h4>
                        <p className="text-brand-light/90">{learning.nineMonthGoal}</p>
                    </div>
                </div>
            </div>
            
            <div>
                <h3 className="font-orbitron text-2xl text-brand-light mb-4">// ASTRONAUT TRACK</h3>
                <div className="space-y-6">
                    <div>
                        <h4 className="font-orbitron text-lg text-brand-primary/90 mb-2">MISSION:</h4>
                        <p className="text-brand-secondary">{astronaut.mission}</p>
                    </div>
                    <div>
                        <h4 className="font-orbitron text-lg text-brand-primary/90 mb-2">LAUNCH PATH:</h4>
                        <motion.ul variants={listVariants} whileInView="visible" viewport={{once: true, amount: 0.3}} initial="hidden" className="space-y-2 text-brand-secondary">
                             {astronaut.launchPath.map(item => <BulletPoint key={item}>{item}</BulletPoint>)}
                        </motion.ul>
                    </div>
                </div>
            </div>
        </div>
    );
};