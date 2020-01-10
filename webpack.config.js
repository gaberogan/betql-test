const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'docs'),
  },
  devServer: {
    contentBase: './docs',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        resolve: { extensions: ['.css'] },
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        resolve: { extensions: ['.js', '.jsx'] },
        use: ['babel-loader'],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
}