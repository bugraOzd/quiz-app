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
      fontSize: {
        heading: "3.2em",
        body: "1em",
      },
      lineHeight: {
        heading: "1.1",
        body: "1.5",
      },
      fontWeight: {
        normal: "400",
        medium: "500",
      },
      minWidth: {
        body: "320px",
      },
      minHeight: {
        body: "100vh",
      },
      borderRadius: {
        button: "8px",
      },
      borderWidth: {
        button: "1px",
      },
      padding: {
        button: "0.6em 1.2em",
      },
      transitionProperty: {
        "border-color": "border-color",
      },
      transitionDuration: {
        default: "250ms",
      },
      outline: {
        focus: "4px auto -webkit-focus-ring-color",
      },
    },
  },
  plugins: [],
};
