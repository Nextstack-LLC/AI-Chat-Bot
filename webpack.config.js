const path = require("path");
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');


module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const config = {
    mode: "production",
    entry: "./src/index.js",
    output: {
      path:  path.resolve(__dirname, "build"),
      filename: "index.js",
      publicPath: "/",
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
      new webpack.DefinePlugin({
        'process.env.IS_BROWSER': JSON.stringify(!isProduction), // Indicate that it's a browser environment
      }),
    ],
    externals: {
      react: "react"
    }
  };

  if (!isProduction) {
    // Add server-side rendering configuration
    config.target = 'node';
    config.externals = [nodeExternals()];
    config.output.libraryTarget = 'commonjs2';
  }

  return config;
}