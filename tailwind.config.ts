import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        "brand-muted": "rgb(var(--brand-muted) / <alpha-value>)",
        "brand-border": "rgb(var(--brand-border) / <alpha-value>)",
        "brand-surface": "rgb(var(--brand-surface) / <alpha-value>)",
        "brand-accent": "rgb(var(--brand-accent) / <alpha-value>)",
        "brand-accent-hover": "rgb(var(--brand-accent-hover) / <alpha-value>)",
        "brand-highlight": "rgb(var(--brand-highlight) / <alpha-value>)",
        "brand-deep": "rgb(var(--brand-deep) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
export default config;
