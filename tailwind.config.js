/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/*.html'],
  theme: {
    extend: {
      colors: {
        'main': '#3366CC'
      },
      backgroundImage: {
        'img-main': "url('/img/background.jpg')"
      }
    },
  },
  plugins: [],
}

