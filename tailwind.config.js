module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './renderer/index.ejs'],
  theme: {
    extend: {
      colors: {
        'discord-sidebar': '#1e1f22',
        'discord-secondary': '#2b2d31',
        'discord-tertiary': '#313338',
        'text-generic-color': '#aad7f5',
        'discord-button-color': '#5865f2',
        'discord-button-color-hover': '#4656c6',
        'discord-bg-1': '#313338',
        'discord-bg-2': '#060607',
        'discord-cross-color': '#6f7278',
        'discord-text-color-1': '#dbdee1',
      },
    },
  },
  variants: {},
  plugins: [],
};
