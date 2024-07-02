import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'main-linear': 'linear-gradient(266deg, #FF5656 2.28%, #FF8181 112.03%)',
      },
    },
    colors: {
      gray: {
        white: '#fff',
        black: '#000',
        50: '#f9fafb',
      },
      brand: {
        50: '#fff3e0',
      },
      supplementary: {
        blue: {
          light: '#e6f2ff',
          deep: '#0052cc',
        },
        red: {
          light: '#ffe6e6',
          deep: '#cc0000',
        },
      }
    },
    fontSize: {
      'm22': ['22px', { lineHeight: '1.5', fontWeight: 'medium' }],
      'sb20': ['20px', { lineHeight: '1.5', fontWeight: 'semibold' }],
      'm20': ['20px', { lineHeight: '1.5', fontWeight: 'medium' }],
      'l20': ['20px', { lineHeight: '1.5', fontWeight: 'light'}],
      'm18': ['18px', { lineHeight: '1.5', fontWeight: 'medium'}],
      'l18': ['18px', { lineHeight: '1.5', fontWeight: 'light'}],
      'r16': ['16px', { lineHeight: '1.5', fontWeight: 'regular'}],
      'r14': ['14px', { lineHeight: '1.5', fontWeight: 'regular'}],
      'm12': ['12px', { lineHeight: '1.5', fontWeight: 'medium'}],
      'sb10': ['10px', { lineHeight: '1.5', fontWeight: 'semibold'}],
    },
  },
  plugins: [],
};
export default config;
