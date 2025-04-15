/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Ensure this path matches where your JSX/TSX files are
  ],
  safelist: [
    ...Array.from({ length: 20 }, (_, i) => `sparkle-${i}`), // Safelist for sparkle classes
  ],
  theme: {
    extend: {
      fontFamily: {
        rampart: ['Rampart One', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
