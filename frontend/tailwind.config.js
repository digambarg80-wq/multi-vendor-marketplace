/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx}",  // Add this line for JavaScript files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}