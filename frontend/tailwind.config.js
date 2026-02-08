/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        booking: {
          blue: '#003580',
          'blue-dark': '#00224F',
          'blue-light': '#1E61E0',
          orange: '#EB6F38',
          gray: {
            50: '#F7F7F7',
            100: '#ECECEC',
            200: '#D1D1D1',
            300: '#B4B4B4',
            400: '#9A9A9A',
            500: '#7B7B7B',
            600: '#5C5C5C',
            700: '#3C3C3C',
            800: '#2C2C2C',
            900: '#1C1C1C',
          }
        },
      },
    },
  },
  plugins: [],
}
