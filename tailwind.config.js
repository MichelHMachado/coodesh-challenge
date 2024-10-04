/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-black": "#18181b",
        "primary-gray": "#2b2b30",
        "secondary-gray": "#4c4c55",
        "light-gray": "#62626c",
      },
    },
  },
  plugins: [],
};
