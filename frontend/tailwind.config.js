/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'primary-color': {
          '50': '#fff2fe',
          '100': '#ffe3fe',
          '200': '#ffc6fd',
          '300': '#ff99f6',
          '400': '#ff5def',
          '500': '#ff21f2',
          '600': '#ff00ff',
          '700': '#cf00ca',
          '800': '#a900a3',
          '900': '#890682',
          '950': '#5e005a',
        },
      },
    },
  },
  plugins: [],
}

