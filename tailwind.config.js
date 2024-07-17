/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "Avenir",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        primary: {
          DEFAULT: "#646cff",
          hover: "#535bf2",
          light: "#747bff",
        },
        secondary: {
          DEFAULT: "#1a1a1a",
          light: "#f9f9f9",
        },
        background: {
          dark: "#242424",
          light: "#ffffff",
        },
        text: {
          dark: "rgba(255, 255, 255, 0.87)",
          light: "#213547",
        },
      },
    },
  },
  plugins: [],
};
