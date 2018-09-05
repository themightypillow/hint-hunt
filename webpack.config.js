const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebpackPlugin({
  template: "./src/index.html",
  filename: "index.html"
});

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [
                require("postcss-import")(),
                require("postcss-mixins")(),
                require("postcss-nested")(),
                require("autoprefixer")(),
                require("postcss-simple-vars")(),
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [htmlPlugin],
  devtool: "inline-source-map",
};