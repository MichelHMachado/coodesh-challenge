/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-black": "#1E1E21",
        "primary-gray": "#2F2F33",
        "secondary-gray": "#62626C",
        "light-gray": "#4D4D56",
      },
    },
  },
  plugins: [],
};
