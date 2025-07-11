/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        'source-code': ['Source Code Pro', 'monospace'],
        audiowide: ['Audiowide', 'sans-serif'],
      },
      colors: {
        'brand-dark': '#010409',
        'brand-bg': '#0D1117',
        'brand-light': '#E6EDF3',
        'brand-primary': '#2F81F7',
        'brand-secondary': '#8B949E',
        'brand-accent': '#F77814',
        'brand-border': 'rgba(230, 237, 243, 0.1)',
      },
      animation: {
        'text-glow': 'text-glow 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        'text-glow': {
          '0%': {
            textShadow: '0 0 4px #2F81F7, 0 0 8px #2F81F7',
          },
          '100%': {
            textShadow: '0 0 8px #2F81F7, 0 0 16px #2F81F7',
          },
        },
      },
    },
  },
  plugins: [],
};
