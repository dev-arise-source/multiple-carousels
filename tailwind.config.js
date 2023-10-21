/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    screens: {
      xs: "500px",
      ...defaultTheme.screens,
      xxl: "1500px",
    },
    extend: {},
  },
  plugins: [],
};
