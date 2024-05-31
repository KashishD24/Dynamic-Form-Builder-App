const { Opacity } = require('@mui/icons-material');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideRight:{
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeUp:{
          '0%': { opacity:0 },
          '100%': { opacity:1 },
        }
      },
       boxShadow: {
        'custom-shadow-1': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        'custom-shadow-2': '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
        'custom-shadow-3': '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
        'custom-shadow-4': '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
        'custom-shadow-5': '0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22)',
      },
    },
      animation: {
        slideIn: 'slideIn 1.5s ease-out',
        slideRight: 'slideRight 1.5s ease-in-out forwards',
        fadeUp: 'fadeUp 2s ease-in-out forwards '
      },
    colors:{
      transparent: 'transparent',
      primary: "#4B49AC",
      secondary: "#98BDFF",
      fadedPink: "#F3797E",
      fadedPurple: "#7978E9",
      fadedBlue: "#7DA0FA",
      white: "#ffff",
      black: "#000",
      fadedRed: "#D3494E",
      fadedGray:'#c0c0c0',
      blackFaded: "#8C8C8C",
      primeBg: "#f3f5f",
      darkMarron:"#58151c",
      gray_100: "#f8f9fa",
    gray_200: "#f3f5f7",
    gray_300: "#dbe0e5",
    gray_400: "#bec8d0",
    gray_500: "#8996a4",
    gray_600: "#5b6b79",
    gray_700: "#3e4853",
    gray_800: "#1d2630",
    gray_900: "#131920",
      fadedGreen: "#50EC3B",
    blackTrans: "#0000004d"
    }
  },
  plugins: [],
}

