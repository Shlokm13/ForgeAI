/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./data/**/*.{js,jsx}",
    "./utils/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          app: "#07090D",
          deep: "#090D13",
          sidebar: "#080C12",
          nav: "#06080C",
        },
        panel: {
          primary: "#0B1017",
          secondary: "#0D121A",
          elevated: "#101620",
          code: "#080D13",
        },
        border: {
          DEFAULT: "#202833",
          subtle: "#171E27",
          elevated: "#293342",
        },
        text: {
          primary: "#F3F4F6",
          secondary: "#A6ADBB",
          muted: "#6F7887",
        },
        forge: {
          purple: "#8B5CF6",
          purpleLight: "#A78BFA",
        },
        evidence: {
          source: "#34D399",
          documented: "#60A5FA",
          context: "#D6A84B",
        },
        danger: "#F87171",
      },
      fontFamily: {
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};
