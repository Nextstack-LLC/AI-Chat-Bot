const path = require('path');

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path:  path.resolve(__dirname, "build"),
    filename: "index.js",
    libraryTarget: "commonjs2",
    publicPath: "/",
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              // Limit the size of the inlined file
              limit: 8192,
            },
          },
        ],
      },
    ]
  },
  externals: {
    react: "react"
  },
};