const path = require('path');

module.exports = {
    entry: './public/script.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'main.js',
  },
};