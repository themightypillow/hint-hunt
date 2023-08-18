const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const env = require("dotenv").config();
if(env.error) throw env.error;

const htmlPlugin = new HtmlWebpackPlugin({
  template: "./src/index.html",
  filename: "index.html"
});

const cssPlugin = new MiniCssExtractPlugin({
  filename: "style.css"
});

module.exports = {
  mode: "production",
  entry: ["babel-polyfill", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "docs")
  },
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
          MiniCssExtractPlugin.loader,
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
                require("cssnano")()
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    htmlPlugin,
    cssPlugin,
    new webpack.DefinePlugin({
      "process.env.FIREBASE_APIKEY": JSON.stringify(process.env.FIREBASE_APIKEY),
      "process.env.FIREBASE_AUTHDOMAIN": JSON.stringify(process.env.FIREBASE_AUTHDOMAIN),
      "process.env.FIREBASE_DATABASEURL": JSON.stringify(process.env.FIREBASE_DATABASEURL),
      "process.env.FIREBASE_PROJECTID": JSON.stringify(process.env.FIREBASE_PROJECTID),
      "process.env.FIREBASE_STORAGEBUCKET": JSON.stringify(process.env.FIREBASE_STORAGEBUCKET),
      "process.env.FIREBASE_MESSAGINGSENDERID": JSON.stringify(process.env.FIREBASE_MESSAGINGSENDERID)
    })
  ],
  devtool: "source-map"
};