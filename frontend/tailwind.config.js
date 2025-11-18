// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Yeh path confirm karein ki aapki saari .js, .jsx files ko cover kar raha ho
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#0A1019',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        fancy: ['"Playfair Display"', 'serif'], 
      }
    },
  },
  plugins: [],
};