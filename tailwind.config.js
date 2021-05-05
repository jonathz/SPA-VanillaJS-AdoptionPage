module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    boxShadow: {
      sm: '0px 3px 15px -7px #000000',
      DEFAULT: '0 7px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
     '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      inner: 'inset 10px -95px 64px -26px #000000',
      none: 'none',
    },
    extend: {
      spacing: {
 
          '72': '18rem',
 
          '84': '21rem',
 
          '96': '24rem',

          '108': '52rem'
 
        },
      colors: {
        primary: "#FEC7D7",
        secondary:"#A786DF",
        selector: "#0e172c",
        homeColor: "#85D1CE",
        messageBubble: "#535353",
        crystal: "rgba(0,0,0,0.9)"

      },
      animation:{
        beat:'beat 1s ease-out infinite',
      },
      keyframes:{
        beat:{
          '0% , 100%':{tramsform:'scale(1)'},
          '25%':{transform: 'scale(1.2)'},
        }
      },
      
    },
    fontFamily: {
      'Nunito': ['Nunito']
    },
  },
  variants: {
    opacity: ['responsive', 'hover', 'focus', 'disabled'],
  },
  plugins: [],
}
 