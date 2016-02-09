module.exports = {
  context: __dirname + '/build',
  entry: './examples/example.js',
  output: {
    path: __dirname + '/build',
    filename: './bundle.js'
  }
};
