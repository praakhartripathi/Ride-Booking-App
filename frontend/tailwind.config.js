/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0f172a',
        mist: '#e2e8f0',
        clay: '#f8fafc',
        ember: '#f97316',
        ocean: '#0f766e',
      },
      fontFamily: {
        sans: ['"Sora"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        lift: '0 24px 60px -24px rgba(15, 23, 42, 0.35)',
      },
      backgroundImage: {
        'city-grid':
          'radial-gradient(circle at top, rgba(249, 115, 22, 0.18), transparent 35%), linear-gradient(135deg, rgba(15, 118, 110, 0.12), transparent 55%)',
      },
    },
  },
  plugins: [],
}
