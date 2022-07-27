/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./content/**/*.html",
    "./layouts/**/*.html",
    "./static/**/*.js",

  ],
  theme: {
    container: {
      center: true
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary-color)',
          white: '#FAFAFA',
          black: '#262626',
          gray: '#E8E8E8'
        },
        secondary: '#474747',
        danger: '#FF6464',
      },
      screens: {
        'xl': '1378px',
        '2xl': '1640px'
      }
    },
    fontFamily: {
      inter: 'Inter, sans-serif'
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),

  ],
}
