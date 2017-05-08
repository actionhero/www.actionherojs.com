export default {
  colors: {
    yellow: '#FBF9E4',
    blue: '#2F5266',
    blueGray: '#6E8898',
    lightGray: '#2F5266',
    red: '#E14E3A',
    white: '#FFFFFF'
  },

  fonts: {
    main: 'Roboto, sans-serif',
    title: 'Open Sans, sans-serif'
  },

  buttons: {
    big: (backgroundColor, color) => {
      return {
        maxWidth: 200,
        borderRadius: 50,
        margin: '0 auto',
        color: color,
        backgroundColor: backgroundColor,
        borderColor: backgroundColor
      }
    }
  }
}
