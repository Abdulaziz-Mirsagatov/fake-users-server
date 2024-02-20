import type { Config } from "tailwindcss";

const config: Config = {
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
        dark: "#121212", // Dark Background
        white: "#ffffff", // White Text
        "dodger-blue": "#3498db", // Dodger Blue Accent
        "medium-dark": "#282828", // Dark Button Background
        "light-gray": "#333333", // Dark Border
        ruby: "#e74c3c", // Ruby Red
      },
    },
  },
  plugins: [],
};
export default config;
