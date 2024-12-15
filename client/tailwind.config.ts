import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "var(--primary-color-100)",
          200: "var(--primary-color-200)",
          250: "var(--primary-color-250)",
          300: "var(--primary-color-300)",
          400: "var(--primary-color-400)",
        },
        outline: "var(--outline-color)",
        text: {
          primary: "var(--text-primary-color)",
          secondary: "var(--text-secondary-color)",
          tertiary: "var(--text-tertiary-color)",
          tag: "var(--text-tag-color)",
          meta: "var(--text-meta-color)",
          error: "var(--text-error-color)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
