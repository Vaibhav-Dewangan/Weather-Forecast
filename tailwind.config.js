/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors :{
        'headerbg' : '#1B262C',
        'bodybgdark':'#0F4C75',
        'bodybglight': '#3282B8',
        'bodybgultralight': '#BBE1FA'
      },
      height:{
        '128': '32rem'
      },
      width:{
        '128': '32rem',
        '60vw':'60vw'
    },
  },
},
  plugins: [],
}
