const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
require("dotenv").config();

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "src", "index.jsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
    // All variables in our .env should be mentioned here
    new webpack.EnvironmentPlugin({
      BASE_SERVER_URL: "",
      REACT_APP_FIREBASE_API_KEY: "",
      REACT_APP_FIREBASE_AUTH_DOMAIN: "",
      REACT_APP_FIREBASE_PROJECT_ID: "",
      REACT_APP_FIREBASE_STORAGE_BUCKET: "",
      REACT_APP_FIREBASE_MESSAGING_SENDER_ID: "",
      REACT_APP_FIREBASE_APP_ID: "",
      REACT_APP_FIREBASE_MEASUREMENT_ID: "",
    }),
  ],
  // To tell the dev server that everything should go back to index.html
  devServer: {
    historyApiFallback: true,
  },
};
