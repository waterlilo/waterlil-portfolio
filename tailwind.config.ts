import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0b0d10",
          soft: "#0f1217"
        },
        fg: {
          DEFAULT: "#f2f2f2",
          dim: "#b6bcc6"
        },
        line: "rgba(255,255,255,0.10)"
      },
      borderRadius: {
        xl2: "1.25rem"
      },
      boxShadow: {
        soft: "0 10px 40px rgba(0,0,0,0.35)"
      }
    }
  },
  plugins: []
} satisfies Config;
