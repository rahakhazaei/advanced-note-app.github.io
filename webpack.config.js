const path = require("path");
// const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
  mode: "development",
  entry: "./src/js/main.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
//   devServer: {
//     static: {
//       directory: path.join(__dirname, "public"),
//     },
//     compress: true,
//     port: 8080,
//     open: true,
//   },
//   optimization: {
//     minimize: true,
//     minimizer: [
//       new TerserPlugin({
//         parallel: true,
//       }),
//     ],
//   },
};
