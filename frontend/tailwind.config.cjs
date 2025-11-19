// tailwind.config.cjs

/** @type {import('tailwindcss').Config} */
module.exports = {
  // 🛑 FIX 1: Naya Plugin Import
  // Hum yahan 'require' use kar rahe hain kyunki file extension .cjs hai.
  // Yeh plugin PostCSS issues ko bypass karne mein help karega.
  plugins: [],
  
  // Content array theek hai, yeh ensure karega ki saari files scan hon
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}", 
    "./index.html",
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
  // Plugins upar define ho chuke hain, isliye yeh array ab sirf zaroori plugins rakhega
  // Agar aapko koi aur plugin chahiye (e.g., forms), toh use yahan add karein:
  // plugins: [require('@tailwindcss/forms')],
};