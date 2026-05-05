/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF7F2',
        brown: {
          DEFAULT: '#2C1810',
          light: '#4A2E22',
          dark: '#1A0E0A',
        },
        gold: {
          DEFAULT: '#C9A96E',
          light: '#D4B882',
          dark: '#A8803E',
        },
        wood: '#b68a5a',
        woodLight: '#d9b382',
        woodBg: '#f4efe9',
        woodSoft: '#e7ded3',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.08) translate(-1%, -1%)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
        scaleIn: 'scaleIn 0.3s ease-out',
        slideUp: 'slideUp 0.8s ease-out forwards',
        kenBurns: 'kenBurns 12s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}
