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
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.json$/, loader: "json-loader" }
    ]
  },
  node : {
    console: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
