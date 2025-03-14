/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Scan all files in src for Tailwind classes
  theme: {
    extend: {
      colors: {
        "maroon-700": "#a52a2a", // Custom color used in Navbar.tsx
      },
    },
  },
  plugins: [], // Add plugins here if needed in the future
}