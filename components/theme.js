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
    title: 'BebasNeue, Roboto, sans-serif',
    docs: 'Open Sans, sans-serif'
  },

  typeography: {
    default: {
      fontSize: 14,
      fontWeight: 200,
      lineHeight: 26
    },
    h1: {
      fontFamily: 'BebasNeue, Roboto, sans-serif',
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
      letterSpacing: 2,
      fontSize: 36
    },
    h2: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 200,
      fontSize: 24,
      color: '#3B5D72'
    },
    h2Alt: {
      fontFamily: 'BebasNeue, Roboto, sans-serif',
      fontWeight: 600,
      fontSize: 24,
      color: '#3B5D72'
    }
  },

  padding: {
    common: 50,
    section: {
      paddingTop: 100,
      paddingBottom: 100
    }
  },

  buttons: {
    big: (backgroundColor, color) => {
      return {
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 400,
        fontSize: 14,
        maxWidth: 200,
        borderRadius: 50,
        margin: '0 auto',
        color: color,
        backgroundColor: backgroundColor,
        borderColor: backgroundColor,
        marginTop: 20,
        marginBottom: 20
      }
    },

    header: (backgroundColor, color) => {
      return {
        fontFamily: 'Roboto, sans-serif',
        maxWidth: 200,
        borderRadius: 50,
        margin: '0 auto',
        color: color,
        backgroundColor: backgroundColor,
        borderColor: backgroundColor,
        marginTop: 20,
        marginBottom: 0,
        marginLeft: 10,
        marginRight: 10
      }
    }
  }
}
