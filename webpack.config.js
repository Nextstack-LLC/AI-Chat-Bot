const path = require("path");
const webpack = require('webpack');

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path:  path.resolve(__dirname, "build"),
    filename: "index.js",
    publicPath: "/",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    // Define a global constant to indicate the environment
    new webpack.DefinePlugin({
      'process.env.IS_BROWSER': JSON.stringify(true),
    }),
  ],
  externals: {
    react: "react"
  }
};