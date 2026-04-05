/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        "surface-card": "#0f0c24",
        "accent-purple": "#7c3aed",
        "accent-purple-light": "#915EFF",
        "accent-cyan": "#06b6d4",
        "text-muted": "#64607d",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
        "glow-sm": "0 0 20px rgba(145, 94, 255, 0.3)",
        "glow-md": "0 0 40px rgba(145, 94, 255, 0.2)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/banner-bg.png')",
      },
      borderColor: {
        "border-subtle": "rgba(124, 58, 237, 0.15)",
      },
    },
  },
  plugins: [],
}
