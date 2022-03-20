module.exports = {
  plugins: [
    tailwindcss("./tailwind.config.js"), // your tailwind.js configuration file path
    require("autoprefixer"),
    require("postcss-loader"),
  ],
}
