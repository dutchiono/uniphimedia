/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green:  '#2D5016',
          lime:   '#4A7C28',
          gold:   '#C9A84C',
          amber:  '#D4A017',
          earth:  '#8B6914',
          cream:  '#F5F0E8',
          bark:   '#3D2B1F',
          stone:  '#6B5744',
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}