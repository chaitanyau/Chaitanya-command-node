import React from 'react';
import { motion, useTransform, useMotionValue, useSpring } from 'framer-motion';
// Assuming constants file provides: { title: "...", subtitle: "...", ctaPrimary: "...", ctaSecondary: "..." }
import { HERO_DATA } from '../constants';

export const Hero: React.FC = () => {
  const heroRef = React.useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // --- Parallax Logic  ---
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set(clientX - left - width / 2);
    y.set(clientY - top - height / 2);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  const titleX = useTransform(x, (val) => val / 30);
  const titleY = useTransform(y, (val) => val / 30);
  const subtitleX = useTransform(x, (val) => val / 20);
  const subtitleY = useTransform(y, (val) => val / 20);
  const buttonsX = useTransform(x, (val) => val / 25);
  const buttonsY = useTransform(y, (val) => val / 25);

  // --- Breathing Glow Logic  ---
  const glow = useSpring(0, { stiffness: 50, damping: 20, mass: 1 });
  React.useEffect(() => {
    const animate = () => {
      glow.set(glow.get() > 0.5 ? 0 : 1);
    };
    const interval = setInterval(animate, 2000);
    return () => clearInterval(interval);
  }, [glow]);
  const breathingTextShadow = useTransform(glow, (g) => {
    const blur1 = 2 + g * 4;
    const blur2 = 8 + g * 10;
    const blur3 = 20 + g * 22;
    const color = '#68faff'; // Using a brighter cyan for the glow
    return `0 0 ${blur1}px #fff, 0 0 ${blur2}px ${color}, 0 0 ${blur3}px ${color}`;
  });
  const breathingBoxShadow = useTransform(glow, (g) => {
    const spread = 2 + g * 6;
    return `0 0 ${spread}px rgba(104, 250, 255, 0.7)`;
  });

  // NEW: Smooth scroll click handler
  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="h-screen flex flex-col items-center justify-center text-center relative -mt-16 select-none px-4"
    >
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{
          x: titleX,
          y: titleY,
          textShadow: breathingTextShadow, // UPDATED: Applied the breathing glow
        }}
        // UPDATED: Applied the new font and changed text color for better glow effect
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-orbitron font-black uppercase tracking-tighter text-black text-shadow-lg"
      >
        {HERO_DATA.title} 
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        style={{ x: subtitleX, y: subtitleY }}
        className="mt-6 max-w-2xl font-orbitron text-base sm:text-lg md:text-xl text-brand-secondary tracking-wide leading-relaxed"
      >
        {HERO_DATA.subtitle}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        style={{ x: buttonsX, y: buttonsY }}
        className="mt-12 flex flex-col sm:flex-row gap-4"
      >
        <motion.a
          href="#projects"
          // NEW: Added onClick for smooth scrolling
          onClick={(e) => handleLinkClick(e, '#projects')}
          style={{ boxShadow: breathingBoxShadow }}
          className="px-8 py-3 font-orbitron font-semibold text-sm uppercase tracking-wide bg-brand-primary text-brand-dark border-2 border-brand-primary rounded-md hover:bg-transparent hover:text-brand-primary transition-all duration-300"
        >
          {/* UPDATED: Text changed as requested */}
          Deployed Constructs
        </motion.a>
        <motion.a
          href="#mission"
          // NEW: Added onClick for smooth scrolling
          onClick={(e) => handleLinkClick(e, '#mission')}
          style={{ boxShadow: breathingBoxShadow }}
          className="px-8 py-3 font-orbitron font-semibold text-sm uppercase tracking-wide text-brand-primary border-2 border-brand-primary rounded-md hover:bg-brand-primary hover:text-brand-dark transition-all duration-300"
        >
          {HERO_DATA.ctaSecondary} {/* Renders "View Mission" */}
        </motion.a>
      </motion.div>
    </section>
  );
};