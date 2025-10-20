/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts,scss}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#0b0b0f',
        card: '#12121a',
        text: '#e8e8f0',
        muted: '#a8a8c0',
        accent: '#7a3dff',
        accent2: '#b08aff',
        accent3: '#66ccff'
      },
      boxShadow: {
        glow: '0 0 40px rgba(122,61,255,.35)'
      },
      borderRadius: {
        xl: '1rem'
      }
    },
  },
  plugins: [],
}

