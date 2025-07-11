import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Project } from '../types';

interface ProjectsProps {
    projects: Project[];
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring' } },
};


const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    return (
        <motion.div
            variants={itemVariants}
            className="p-6 rounded-lg flex flex-col h-full bg-brand-bg/60 backdrop-blur-md border border-brand-border"
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
        >
            <h3 className="font-orbitron text-xl font-bold text-brand-primary mb-3">{project.title}</h3>
            <p className="font-source-code text-brand-secondary mb-4 flex-grow">{project.description}</p>
            <div className="mt-auto">
                {project.stack && (
                    <p className="font-source-code text-xs text-brand-accent mb-2">
                        <span className="font-bold text-brand-primary/80">// STACK: </span>{project.stack}
                    </p>
                )}
                <p className="font-source-code text-xs text-brand-light">
                    <span className="font-bold text-brand-primary/80">// ROLE: </span>{project.role}
                </p>
            </div>
        </motion.div>
    );
};

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
    return (
        <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
            ))}
        </motion.div>
    );
};