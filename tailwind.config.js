/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Brand
        "blue-100": "#8996EB", // blue-light
        "blue-200": "#5165E1", // blue-base
        "blue-500": "#2E3DA3", // blue-dark

        // Grayscale
        "gray-100": "#151619",
        "gray-200": "#1E2024",
        "gray-300": "#535964",
        "gray-400": "#858B99",
        "gray-500": "#E3E5E8",
        "gray-600": "#F9FAFA",

        // Feedback
        "red-400": "#D03E3E", // feedback-danger
        "yeloow-400": "#eedb32", // feedback-open
        "blue-400": "#355EC5", // feedback-progress
        "green-400": "#508B26" // feedback-done
      }
    }
  },
  plugins: []
};
