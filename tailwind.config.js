/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        dynaPuff: ["DynaPuff", "cursive"],
      },
      colors: {
        primary: "#1856AD",
        primary_light: "#97D2EC",
        secondary: "#0F3460",
      },
    },
  },
  plugins: [],
};
