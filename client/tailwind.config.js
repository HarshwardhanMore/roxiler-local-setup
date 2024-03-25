/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-bg-col": "var(--primary-bg-col)",
        "secondary-bg-col": "var(--secondary-bg-col)",
        "primary-col": "var(--primary-col)",
        "secondary-col": "var(--secondary-col)",
      },
    },
  },
  plugins: [],
};
