import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).getPropertyValue('cursor') === 'pointer'
      );
    };

    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const cursorVariants: Variants = {
    default: {
      height: 32,
      width: 32,
      border: '2px solid #2F81F7', // brand-primary
      backgroundColor: 'transparent',
      transition: { type: 'spring', stiffness: 500, damping: 30 }
    },
    pointer: {
      height: 48,
      width: 48,
      border: '2px solid #F77814', // brand-accent
      backgroundColor: 'rgba(247, 120, 20, 0.2)',
      transition: { type: 'spring', stiffness: 500, damping: 30 }
    },
  };

  const dotVariants: Variants = {
    default: {
      height: 8,
      width: 8,
      backgroundColor: '#2F81F7',
    },
    pointer: {
      height: 6,
      width: 6,
      backgroundColor: '#F77814',
    }
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50"
        variants={cursorVariants}
        animate={isPointer ? 'pointer' : 'default'}
        style={{ x: position.x - 16, y: position.y - 16 }}
      />
      <motion.div
         className="fixed top-0 left-0 rounded-full pointer-events-none z-50"
         variants={dotVariants}
         animate={isPointer ? 'pointer' : 'default'}
         style={{ x: position.x - 4, y: position.y - 4 }}
      />
    </>
  );
};
