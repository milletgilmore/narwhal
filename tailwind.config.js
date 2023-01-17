/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/partials/*.ejs",
  "./views/*.ejs"
  ],
  theme: {
    screens:{
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors:{
        blue: 'rgb(33,165,204)',
        lightBlue: 'rgb(120,196,217)',
        darkBlue: 'rgb(8,131,177)',
        gray: 'rgb(132,148,172)',
      }
    },
  },
  plugins: [],
}
