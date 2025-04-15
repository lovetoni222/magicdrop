/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: Array.from({ length: 20 }, (_, i) => `sparkle-${i}`),
  theme: {
    extend: {},
  },
  plugins: [],
};git add tailwind.config.js
git commit -m "Add safelist for sparkle classes to prevent purge"
git push