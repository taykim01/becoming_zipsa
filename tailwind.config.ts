import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'app-gradient-2': 'linear-gradient(180deg, #D5F8FF 0.01%, #BEB4FF 119.88%)',
        'app-gradient-3': 'linear-gradient(180deg, #FDCDD2 0.01%, #DDD1D2 32.38%, #BCD5D3 65.34%, #A2D8D3 90.51%, #85DBD4 119.88%)',
        'app-gradient-0': 'linear-gradient(180deg, #2A2A2A 0.01%, #676767 89.13%, #909090 129.7%)',
        'app-gauge-gradient': 'linear-gradient(90deg, rgba(186, 194, 154, 0.90) 0%, rgba(224, 163, 146, 0.95) 100.32%, #FE8A8B 179.14%)',
      },
    },
    colors: {
      'black': '#1b1b1b',
      'white': '#fff',
      'gray': '#f1f3f5',
      'gradient-1-70': '#fff',
      'gradient-1-90': '#fff',
      'pink-main': '#fe8a8b',
      'pink-200': '#ff6c6d',
    },
    fontFamily: {
      'ohsquare': ['Cafe24 Ohsquare', 'sans-serif'],
    },
    fontSize: {
      'm22': ['22px', { lineHeight: '1.5', fontWeight: 'medium' }],
      'sb20': ['20px', { lineHeight: '1.5', fontWeight: 'semibold' }],
      'm20': ['20px', { lineHeight: '1.5', fontWeight: 'medium' }],
      'l20': ['20px', { lineHeight: '1.5', fontWeight: 'light'}],
      'm18': ['18px', { lineHeight: '1.5', fontWeight: 'medium'}],
      'l18': ['18px', { lineHeight: '1.5', fontWeight: 'light'}],
      'r20': ['20px', { lineHeight: '1.5', fontWeight: 'regular'}],
      'r16': ['16px', { lineHeight: '1.5', fontWeight: 'regular'}],
      'r14': ['14px', { lineHeight: '1.5', fontWeight: 'regular'}],
      'm12': ['12px', { lineHeight: '1.5', fontWeight: 'medium'}],
      'sb10': ['10px', { lineHeight: '1.5', fontWeight: 'semibold'}],
      '45': '45px',
      '20': '20px'
    },
    lineHeight: {
      '150': '1.5',
    },
  },
  plugins: [],
};
export default config;
