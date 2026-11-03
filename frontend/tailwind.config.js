/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Playfair Display", "serif"],
      },
      colors: { ink: "#101827", accent: "#e9a23b" },
      boxShadow: { soft: "0 16px 50px rgba(16,24,39,.08)" },
    },
  },
  plugins: [],
};
