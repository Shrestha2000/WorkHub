/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary : '#957DAD'
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}