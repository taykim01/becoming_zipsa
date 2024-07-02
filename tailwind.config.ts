import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-0': 'linear-gradient(180deg, #2A2A2A 0.01%, #676767 89.13%, #909090 129.7%)',
        'gradient-1': 'linear-gradient(180deg, rgba(254, 138, 139, 0.70) 0%, rgba(255, 146, 139, 0.70) 26%, rgba(254, 167, 137, 0.70) 51%, rgba(255, 195, 152, 0.70) 76.8%, rgba(253, 229, 157, 0.70) 100%)',
        'gradient-2': 'linear-gradient(180deg, #D5F8FF 0.01%, #BEB4FF 119.88%)',
        'gradient-3': 'linear-gradient(180deg, #FDCDD2 0.01%, #DDD1D2 32.38%, #BCD5D3 65.34%, #A2D8D3 90.51%, #85DBD4 119.88%)',
        'gradient-gauge': 'linear-gradient(90deg, rgba(186, 194, 154, 0.90) 0%, rgba(224, 163, 146, 0.95) 100.32%, #FE8A8B 179.14%)',
      },
    },
    colors: {
      'black': '#1b1b1b',
      'white': '#fff',
      'gray': '#f1f3f5',
      'beige': '#FEE9D8',
      'gradient-1-70': '#fff',
      'gradient-1-90': '#fff',
      'pink-main': '#fe8a8b',
      'pink-100': '#F57A87',
      'pink-200': '#ff6c6d',
      'pink-300': '#E3AE99',
      'pink-400': '#FF6C6D',
      'pink-500': '#9f4e4f',
      'emerald-500' : '#9AB9B0',
      'white-12': 'rgba(255, 255, 255, 0.12)',
      'white-15': 'rgba(255, 255, 255, 0.15)',
      'white-20': 'rgba(255, 255, 255, 0.20)',
      'white-40': 'rgba(255, 255, 255, 0.40)',
      'white-50': 'rgba(255, 255, 255, 0.50)',
      'white-72': 'rgba(255, 255, 255, 0.72)',
      'white-80': 'rgba(255, 255, 255, 0.80)'
    },
    fontFamily: {
      'ohsquare': ['Cafe24Ohsquare', 'sans-serif'],
      'fs-sb': ['Freesentation-6SemiBold', 'sans-serif'],
      'fs-m': ['Freesentation-5Medium', 'sans-serif'],
      'fs-r': ['Freesentation-4Regular', 'sans-serif'],
      'fs-l': ['Freesentation-3Light', 'sans-serif'],
    },
    fontSize: {
      'm22': ['22px', { lineHeight: '1.5' }],
      'sb20': ['20px', { lineHeight: '1.5' }],
      'm20': ['20px', { lineHeight: '1.5' }],
      'l20': ['20px', { lineHeight: '1.5' }],
      'm18': ['18px', { lineHeight: '1.5' }],
      'l18': ['18px', { lineHeight: '1.5' }],
      'r16': ['16px', { lineHeight: '1.5' }],
      'r14': ['14px', { lineHeight: '1.5' }],
      'm12': ['12px', { lineHeight: '1.5' }],
      'sb10': ['10px', { lineHeight: '1.5' }],
      'r45': ['45px', { lineHeight: '1.5' }],
      'r20': ['20px', { lineHeight: '1.5' }]
    },
  },
  plugins: [],
};
export default config;
