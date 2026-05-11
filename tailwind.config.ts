import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { 500: '#D4AF37', 600: '#C5A028' },
      },
    },
  },
  plugins: [],
};

export default config;
