/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0a0a0f',
          800: '#0f0f1a',
          700: '#161625',
          600: '#1e1e30',
          500: '#2a2a40',
        },
        neon: {
          blue: '#00d4ff',
          purple: '#8b5cf6',
          pink: '#ec4899',
          green: '#10b981',
          red: '#ef4444',
          orange: '#f59e0b',
          cyan: '#06b6d4',
        },
        rank: {
          e: '#6b7280',
          d: '#10b981',
          c: '#3b82f6',
          b: '#8b5cf6',
          a: '#f59e0b',
          s: '#ef4444',
          national: '#ec4899',
        },
      },
    },
  },
  plugins: [],
};
