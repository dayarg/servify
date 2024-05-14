/** @type {import('tailwindcss').Config} */
const { screens } = require('tailwindcss/defaultTheme');
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{ts,tsx,js,jsx,html}'],
  theme: {
    screens,
    colors: {
      primary: '#28294D',
      secondary: '#087E8B',
      'primary-blue': '#030534',
      'blue-persa': '#3227C4',
      lavanda: '#D4CAFF',
      magnolia: '#F5F2F9',
      fuchsia: '#FF74A9',
      orange: '#F87913',
      green: '#6EC4AC',
      yellow: '#FFC466',
      'electric-blue': '#1398F8',
      'deep-blue': '#130745',
      charcoal: '#3D3D3D',
      'regular-grey': '#757575',
      grey: '#A9A9A9',
      'light-grey': '#EAEAEA',
      snow: '#F7F7F9',
      black: '#181818',
      success: '#04844B',
      error: '#C23934',
      'yellow-pastel': '#FFF9F0',
      'error-pastel': '#F9EBEB',
      'success-pastel': '#E6F3ED',
      'electric-blue-pastel': '#E7F5FE',
      'primary-pastel': '#EFEBFF',
      'secondary-pastel': '#F8F1FF',
      'lavanda-pastel': '#FBFAFF',
      'fuchsia-pastel': '#FFF1F6',
      'orange-pastel': '#FEF2E7',
      'green-pastel': '#F0F9F7',
      'blue-persa-pastel': '#EAE9F9',
      white: '#FFFFFF',
      transparent: 'transparent',
    },
    fontSize: {
      h1: ['56px', '66px'],
      h2: ['48px', '58px'],
      h3: ['40px', '50px'],
      h4: ['32px', '40px'],
      h5: ['24px', '32px'],
      h6: ['20px', '26px'],
      'body-m': ['16px', '22px'],
      'body-s': ['14px', '20px'],
      'detail-s': ['12px', '18px'],
      'detail-xs': ['10px', '16px'],
    },
    fontFamily: {
      regular: ['DM Sans'],
      medium: ['DM Sans'],
      bold: ['DM Sans'],
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
    extend: {},
  },
  plugins: [],
}