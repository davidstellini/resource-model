module.exports = {
  context: __dirname + '/src',
  entry: './examples/example.ts',
  output: {
    path: __dirname + '/build',
    filename: './bundle.js'
  },
  resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' },
    ]
  }
};
