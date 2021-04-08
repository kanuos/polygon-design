module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily : {
        base : ["Montserrat"]
      }
    },
  },
  variants: {
    extend: {
      translate : ["group-hover"],
      width : ["group-hover"],
      scale : ["group-hover"]
    },
  },
  plugins: [],
}
