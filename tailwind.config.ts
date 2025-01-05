import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        "zoom-in": "zoomIn 1.5s ease-in-out",
        "full-zoom": "fullZoom 1.5s ease-in-out forwards",
        "fade-in": "fadeIn 1s ease-out",
      },
      keyframes: {
        zoomIn: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
      },
      fullZoom: {
        "0%": { transform: "scale(1)", opacity: "1" },
        "100%": { transform: "scale(2)", opacity: "0" },
      },
      fadeIn: {
        "0%": { opacity: "0", transform: "translateY(20px)" },
        "100%": { opacity: "1", transform: "translateY(0)" },
      },
      
    },
  },
  },
  plugins: [],
} satisfies Config;
