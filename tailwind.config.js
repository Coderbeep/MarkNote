/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/**/*.{js,ts,jsx,tsx,scss}'],
  theme: {
    fontFamily: {
      caskaydia: ['CaskaydiaMono Nerd Font', 'monospace'],
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
