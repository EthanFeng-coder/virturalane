const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development', // Set to 'development' or 'production'
  entry: './src/index.js', // Adjust this path to your main entry file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js' // The output file
  },
  target: 'node',
  externals: [nodeExternals()], // Exclude node_modules from the bundle
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
