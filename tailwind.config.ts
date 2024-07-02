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
      'b32': ['32px', { lineHeight: '1.4', fontWeight: 'bold' }],
      'b26': ['26px', { lineHeight: '1.4', fontWeight: 'bold' }],
      'b22': ['22px', { lineHeight: '1.4', fontWeight: 'bold' }],
      'r16': ['16px', { lineHeight: '1.4', fontWeight: 'regular'}],
      'b16': ['16px', { lineHeight: '1.4', fontWeight: 'bold'}],
      'm16': ['16px', { lineHeight: '1.4', fontWeight: 'medium'}],
      'r14': ['14px', { lineHeight: '1.5', fontWeight: 'regular'}],
      'm14': ['14px', { lineHeight: '1.5', fontWeight: 'medium'}],
      'r12': ['12px', { lineHeight: '1.5', fontWeight: 'regular'}],
      'b12': ['12px', { lineHeight: '1.5', fontWeight: 'bold'}],
      'r11': ['11px', { lineHeight: '1.3', fontWeight: 'regular'}],
      'b11': ['11px', { lineHeight: '1.3', fontWeight: 'bold'}],
      'r10': ['10px', { lineHeight: '1.3', fontWeight: 'regular'}],
      'b10': ['10px', { lineHeight: '1.3', fontWeight: 'bold'}],
    },
  },
  plugins: [],
};
export default config;
