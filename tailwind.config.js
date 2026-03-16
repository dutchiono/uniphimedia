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
          green:  '#0F5C4B',
          lime:   '#1A8A6F',
          gold:   '#FF6A00',
          amber:  '#FF8A1F',
          earth:  '#A44C14',
          cream:  '#EEF2F5',
          bark:   '#0B0D12',
          stone:  '#4B5563',
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
