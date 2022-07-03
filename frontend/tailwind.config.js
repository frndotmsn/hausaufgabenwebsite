const Nth =  require('tailwindcss-nth-child');
const plugin =  new  Nth('odd')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      aspectRatio: {
        '5/9': 'aspect-ratio: 5/9;'
      }
    },
  },
  variants: {
    extend: {}
  },
  plugins: [
    plugin.nthChild()
  ],
}
