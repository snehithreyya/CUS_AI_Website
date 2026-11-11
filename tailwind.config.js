/** Tailwind config — mirrors the former inline CDN config so output is identical.
 *  Rebuild after editing any HTML/JS class names:  npm run build:css
 *  @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        navy: { 900: '#0a1633', 800: '#0f2350', 700: '#14306e' },
        brand: { 400: '#5b8bff', 500: '#2f6bff', 600: '#1e56d6' },
        cyan: { 400: '#38bdf8' }
      },
      fontFamily: { sans: ['Inter', 'sans-serif'], display: ['Sora', 'sans-serif'] }
    }
  },
  plugins: []
};
