import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cinema: {
          black: "#0D0B09",
          paper: "#F0E1BF",
          red: "#A71920",
          maroon: "#571015",
          gold: "#C49A48",
          brown: "#30251D",
          charcoal: "#161310",
          border: "#3B2E24",
          cream: "#F0E1BF",
        },
        // The 7 Kollywood Worlds Specific Palettes
        world: {
          kaithi: {
            bg: "#0B0A08",
            sodium: "#E67E22",
            dark: "#1A1713",
            road: "#3A352F",
          },
          leo: {
            bg: "#08090C",
            ice: "#C5D1D9",
            red: "#A71920",
            dark: "#12141A",
          },
          rolex: {
            bg: "#0A0907",
            gold: "#C49A48",
            amber: "#99732B",
            smoke: "#221E19",
          },
          karuppu: {
            bg: "#0D0C0A",
            mud: "#3D2E24",
            vermilion: "#8A1C14",
            charcoal: "#1A1715",
          },
          mm: {
            bg: "#F4ECD8",
            yellow: "#D97706",
            red: "#A71920",
            ink: "#1C1814",
          },
          vip: {
            bg: "#EDE2CC",
            ink: "#0D0B09",
            red: "#A71920",
            tea: "#995C2B",
          },
          mankatha: {
            bg: "#0B0B0C",
            white: "#FFFFFF",
            gold: "#C49A48",
            slate: "#212226",
          },
        },
      },
      fontFamily: {
        poster: ["var(--font-bebas)", "Anton", "Impact", "sans-serif"],
        editorial: ["var(--font-playfair)", "Georgia", "serif"],
        typewriter: ["var(--font-courier)", "Courier New", "monospace"],
        sans: ["var(--font-inter)", "sans-serif"],
        headline: ["var(--font-bebas)", "Anton", "sans-serif"],
      },
      boxShadow: {
        hard: "4px 4px 0px #0D0B09",
        "hard-lg": "8px 8px 0px #0D0B09",
        "hard-red": "4px 4px 0px #A71920",
        "hard-gold": "4px 4px 0px #C49A48",
        "hard-orange": "4px 4px 0px #E67E22",
        "hard-paper": "4px 4px 0px #F0E1BF",
        stamp: "0 0 0 3px #A71920, 3px 3px 0px #571015",
      },
      borderRadius: {
        DEFAULT: "0px",
        sm: "0px",
        md: "0px",
        lg: "0px",
        xl: "0px",
        "2xl": "0px",
      },
    },
  },
  plugins: [],
};

export default config;
