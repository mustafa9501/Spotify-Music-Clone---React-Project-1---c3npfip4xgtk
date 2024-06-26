/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.js",],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-sarif"],
      },
      height: {
        "h-90" : "22rem",
        "1/10": "10%",
        "9/10": "85%",
        "9/11": "88%",
        "7/10": "71%",
        "10/10": "90%",
        "10/11": "93%",
        "4/5" : "78%",
      },
      margin: {
        "ml-68": "272px",
      },
      screen:{
        "sm": "540",
      },
      width:{
        "w-38": "148px",
      },
    },
  },
  plugins: [],
}

