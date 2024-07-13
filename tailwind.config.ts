import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'type1_dark': 'linear-gradient(180deg, rgba(254, 138, 139, 0.90) 0%, rgba(255, 146, 139, 0.90) 26%, rgba(254, 167, 137, 0.90) 51%, rgba(255, 195, 152, 0.90) 76.8%, rgba(253, 229, 157, 0.90) 100%), #FFFFFF',
        'type1_light': 'linear-gradient(180deg, rgba(254, 138, 139, 0.70) 0%, rgba(255, 146, 139, 0.70) 26%, rgba(254, 167, 137, 0.70) 51%, rgba(255, 195, 152, 0.70) 76.8%, rgba(253, 229, 157, 0.70) 100%), #FFFFFF',
        'type2': 'linear-gradient(180deg, #2A2A2A 0.01%, #676767 89.13%, #909090 129.7%)',
        'type3': 'linear-gradient(180deg, #D5F8FF 0.01%, #BEB4FF 119.88%)',
        'type4': 'linear-gradient(180deg, #FDCDD2 0.01%, #DDD1D2 32.38%, #BCD5D3 65.34%, #A2D8D3 90.51%, #85DBD4 119.88%)',
        'type5': 'linear-gradient(180deg, #2A2A2A 0.01%, #676767 113.9%, #909090 165.74%)'
      },
    },
    colors: {
      brown: {
        900: '#5c4040',
        400: '#d89564',
        200: '#b67979',
        100: '#c59494',
      },
      beige: {
        300: '#e3ae99',
        200: '#fee9d8',
        100: '#fff7f0',
      },
      black: {
        1: '#1b1b1b',
        '0-7': 'rgba(0, 0, 0, 0.7)',
        '0-2': 'rgba(0, 0, 0, 0)',
        '0-5': 'rgba(0, 0, 0, 0.5)',
        35: 'rgba(0, 0, 0, 0.35)',
        '0-3': 'rgba(0, 0, 0, 0.3)',
      },
      white: {
        1: '#fff',
        '0-8': 'rgba(255, 255, 255, 0.8)',
        '0-7': 'rgba(255, 255, 255, 0.7)',
        '0-6': 'rgba(255, 255, 255, 0.6)',
        '0-5': 'rgba(255, 255, 255, 0.5)',
        '0-15': 'rgba(255, 255, 255, 0.15)',
        '0-2': 'rgba(255, 255, 255, 0.2)',
        '0-72': 'rgba(255, 255, 255, 0.72)',
        '0-4': 'rgba(255, 255, 255, 0.4)',
      },
      pink: {
        500: '#9f4e4f',
        400: '#ff6c6d',
        300: '#f57a87',
        200: '#fe8a8b',
        50: '#fff2f2',
        '0-6': 'rgba(245, 122, 135, 0.6)',
        '0-15': 'rgba(254, 138, 139, 0.15)',
        '0-2': 'rgba(254, 138, 139, 0.2)',
      },
      gray: {
        900: '#1b1b1b',
        800: '#323232',
        700: '#484848',
        600: '#585858',
        500: '#6d6d6d',
        400: 'rgba(126, 126, 126, 0.91)',
        300: '#c4c4c4',
        200: '#dcdcdc',
        100: '#f1f3f5',
      },
      green: {
        200: '#788d91',
        100: '#9ab9b0',
        50: '#d8bc9e',
      },
      yellow: {
        100: '#ffeebc',
      },
    },
    fontFamily: {
      'ohsquare': ['Cafe24Ohsquare', 'sans-serif'],
      'fs-sb': ['Freesentation-6SemiBold', 'sans-serif'],
      'fs-m': ['Freesentation-5Medium', 'sans-serif'],
      'fs-r': ['Freesentation-4Regular', 'sans-serif'],
      'fs-l': ['Freesentation-3Light', 'sans-serif'],
    },
    fontSize: {
      'o45': ['45px', { lineHeight: '1.5' }],
      'o20': ['20px', { lineHeight: '1.5' }],
      '22': ['22px', { lineHeight: '1.5' }],
      '20': ['20px', { lineHeight: '1.5' }],
      '18': ['18px', { lineHeight: '1.5' }],
      '16': ['16px', { lineHeight: '1.5' }],
      '14': ['14px', { lineHeight: '1.5' }],
      '12': ['12px', { lineHeight: '1.5' }],
      '10': ['10px', { lineHeight: '1.5' }]
    },
  },
  plugins: [],
};
export default config;
