module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './renderer/index.ejs'],
  theme: {
    extend: {
      colors: {
        'discord-sidebar': '#1e1f22',
        'discord-secondary': '#2b2d31',
        'discord-tertiary': '#313338',
      },
    },
  },
  variants: {},
  plugins: [],
};
