/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.js",],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-sarif"],
      },
      height: {
        "1/10": "10%",
        "9/10": "85%",
        "7/10": "71%",
      },
      margin: {
        "ml-68": "272px",
      },
    },
  },
  plugins: [],
}

