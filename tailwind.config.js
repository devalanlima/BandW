/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,vue}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors:{
        primary:'rgb(var(--primary) / <alpha-value>)',
        secondary:'rgb(var(--secondary) / <alpha-value>)',
        error: 'rgb(var(--error) / <alpha-value>)',
        darkest_error: 'rgb(var(--darkest_error) / <alpha-value>)',
        info: 'rgb(var(--info) / <alpha-value>)',
        darkest_info: 'rgb(var(--darkest_info) / <alpha-value>)',
        warning: 'rgb(var(--warning) / <alpha-value>)',
        darkest_warning: 'rgb(var(--darkest_warning) / <alpha-value>)',
        success: 'rgb(var(--success) / <alpha-value>)',
        darkest_success: 'rgb(var(--darkest_success) / <alpha-value>)',
      },
      boxShadow: {
        solid: '3px 3px 0px 0px rgb(0 0 0 / 1)',
      },
    },
  },
  plugins: [],
}