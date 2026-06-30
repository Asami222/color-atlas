import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Figmaで設定したカラーコードをここに割り当てます
        primary: {
          DEFAULT: "#1D4ED8", // Figmaのメインのprimary
          light: "#60A5FA",   // 明るいトーン
          dark: "#1E3A8A",    // 暗いトーン
        },
        secondary: "#F59E0B",
      },
      screens: {
        sm: "30rem",   // 480px
        "2xl": "100rem", // 1600px
        "3xl": "120rem", // 1920px
      },
      borderWidth: {
        3: '3px',
      }
    },
  },
  plugins: [],
};
export default config;
