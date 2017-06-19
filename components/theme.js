export default {
  colors: {
    red: '#E14E3A',
    blue: '#2F5266',
    blueGray: '#6E8898',
    yellow: '#FBF9E4',
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
      fontWeight: 300,
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
      fontWeight: 300,
      fontSize: 20,
      lineHeight: '1.5em',
      color: '#3B5D72'
    },
    h2Alt: {
      fontFamily: 'BebasNeue, Roboto, sans-serif',
      fontWeight: 800,
      fontSize: 24,
      letterSpacing: 1,
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

  form: {
    input: {
      border: 0,
      outline: 0,
      background: 'transparent',
      borderBottom: '2px solid #2F5266',
      marginBottom: 20,
      paddingBottom: 10,
      width: '100%',
      fontSize: 24,
      fontWeight: 300
    }
  },

  buttons: {
    big: (backgroundColor, color) => {
      return {
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 300,
        fontSize: 14,
        maxWidth: 200,
        borderRadius: 50,
        margin: '0 auto',
        color: color,
        backgroundColor: backgroundColor,
        borderColor: backgroundColor,
        marginTop: 20,
        marginBottom: 20,
        paddingTop: 15,
        paddingBottom: 15,
        outline: 'none'
      }
    },

    header: (backgroundColor, color) => {
      return {
        fontFamily: 'Roboto, sans-serif',
        fontSize: 14,
        maxWidth: 200,
        borderRadius: 50,
        margin: '0 auto',
        color: color,
        backgroundColor: backgroundColor,
        borderColor: backgroundColor,
        fontWeight: 300,
        marginTop: 20,
        marginBottom: 0,
        marginLeft: 10,
        marginRight: 10,
        outline: 'none'
        // paddingTop: 10,
        // paddingBottom: 10
      }
    }
  }
}
