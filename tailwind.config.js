/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        purple: "#8F2D56",
        red: "#FF0000",
        "dark-gray": "#333333",
        black: "#292929",
      },
      fontFamily: {
        'playfair': ["Playfair Display", "serif"],
      },
    },
  },
  daisyui: {
    themes: [
      "winter",
      "night",

      {
        light: {
          primary: "#8F2D56",
          secondary: "#F4F4F4",
          accent: "#facc15",
          neutral: "#E5E7EB",
          "base-100": "#e5e7eb",
          info: "#93c5fd",
          success: "#4BCE68",
          warning: "#8F2D56",
          error: "#f87171",
        },
        dark: {
          primary: "#8F2D56",
          secondary: "#F4F4F4",
          accent: "#facc15",
          neutral: "#E5E7EB",
          "base-100": "#1f2937",
          info: "#93c5fd",
          success: "#4BCE68",
          warning: "#8F2D56",
          error: "#f87171",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
