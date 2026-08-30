/** @type {import('tailwindcss').Config} */
module.exports = {
  // ፕሮጀክቱ ውስጥ ያሉ ፋይሎችን Tailwind CSS እንዲቃኛቸው የሚገለጽበት ቦታ
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ከተቋሙ ሎጎ ጋር የተጣጣሙ የቀለም ምርጫዎች (Brand Colors)
      colors: {
        // የሎጎው ብርቱካናማ (Warm Orange) ቀለም
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f37021', // ዋናው የሎጎ ብርቱካናማ ቀለም
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        // የሎጎው ጥቁር ሰማያዊ (Deep Navy Blue) ቀለም
        navy: {
          50: '#f0f3fa',
          100: '#d9e2f5',
          200: '#b8c9ec',
          300: '#8baae0',
          400: '#5a85cf',
          500: '#3863be',
          600: '#264aa5',
          700: '#1e3883',
          800: '#1a2b64',
          900: '#161c3b', // የሎጎው ዋና ጥቁር ሰማያዊ ቀለም
          950: '#0c0f24', // ጥልቅ የጀርባ ቀለም
        },
      },
    },
  },
  plugins: [],
};
