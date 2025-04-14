/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#fe624c',
      },
      backgroundColor: {
        primary: '#f4f4f4',
      },
    },
  },
  plugins: [],
};
