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
    noParse: /node_modules\/json-schema\/lib\/validate\.js/,
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  }
};
