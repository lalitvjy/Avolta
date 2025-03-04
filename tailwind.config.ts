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
        primaryAvolta: "#8756E8",
        primaryL: "#ECE4FB",
        primaryL2: "#D4C2F7",
        grayscale600: "#0E0B2B",
        gray500: "#56546B",
        gray400: "#868595",
        softPink: "#FFDCDD",
        deepRed: "#9A1016",
        orange: "#FF9066",
      },
      backgroundImage: {
        "gradient-avolta":
          "linear-gradient(to bottom, rgba(212, 194, 247, 0), rgba(125, 74, 230, 1))",
      },
      borderRadius: {
        "40px": "40px",
      },
    },
  },
  plugins: [],
} satisfies Config;
