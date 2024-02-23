import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      s: { max: '767px' },
      m: { min: '768px', max: '1023px' },
      l: { min: '1024px', max: '1399px' },
      ll: { min: '1400px' },
    },
    extend: {
      colors: {
        main: '#FFF',
        sub: '#FFF',
        text: '#444',
      },
    },
  },
  plugins: [],
};
export default config;
