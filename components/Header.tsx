import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { GlossyGradient } from './GlossyGradient';

interface HeaderProps {
  links: { name: string; href: string }[];
}

const GradientBackground = () => (
  <div className="absolute top-0 left-0 w-full h-full z-0">
    <Canvas>
      <Suspense fallback={null}>
        <GlossyGradient scale={1.0} />
      </Suspense>
    </Canvas>
  </div>
);

export const Header: React.FC<HeaderProps> = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40">
      <div className="relative flex justify-between items-center h-28 shadow-lg overflow-hidden px-4 sm:px-6 lg:px-8">
        <GradientBackground />

        <div className="relative z-10 w-full flex justify-between items-center">
          {/* UPDATED: Added glow classes and removed the inline style */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="text-lg sm:text-xl font-orbitron font-bold tracking-wide text-white transition-all duration-300 ease-in-out drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)] hover:text-shadow-[0_0_8px_rgba(104,250,255,0.7),0_0_16px_rgba(104,250,255,0.7)]"
          >
            C<span className="text-brand-primary">/</span>R
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 items-center">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                // UPDATED: Added glow classes and removed the inline style
                className="inline-block text-sm font-sans tracking-wider text-white hover:scale-110 transition-all duration-300 ease-in-out drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)] hover:text-shadow-[0_0_8px_rgba(104,250,255,0.7),0_0_16px_rgba(104,250,255,0.7)]"
              >
                <span className="text-brand-primary">/</span>
                {link.name.toLowerCase()}
              </a>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'} /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="relative md:hidden border-t border-brand-border p-4 shadow-lg overflow-hidden"
          >
            <GradientBackground />
            <nav className="relative z-10 flex flex-col items-center gap-4">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { handleLinkClick(e, link.href); setIsOpen(false); }}
                  // UPDATED: Added glow classes and removed the inline style
                  className="inline-block text-base font-sans text-white hover:scale-110 transition-all duration-300 ease-in-out drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)] hover:text-shadow-[0_0_8px_rgba(104,250,255,0.7),0_0_16px_rgba(104,250,255,0.7)] py-2"
                >
                  /{link.name.toLowerCase()}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};