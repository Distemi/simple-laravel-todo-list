/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./resources/**/*.blade.php",
      "./resources/**/*.tsx",
  ],
  theme: {
    extend: {
        width: {
            '112': '28rem',
            '128': '32rem',
            '144': '36rem',
            '160': '40rem',
            '176': '44rem',
        }
    },
  },
  plugins: [],
}

