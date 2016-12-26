var webpack = require('webpack');
module.exports = {
  entry: './src/main.jsx',
  output: {
    path: './public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx/,
      loader: 'babel-loader',
      exclude: [/node_modules/, /public/],
      query: {
        presets: ['es2015', 'react']
      }
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader?importLoaders=1!postcss-loader'
    }, {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!postcss-loader!sass-loader'
    }, {
      test: /\.ttf$/,
      loader: "file-loader" 
    }]
  },
//  plugins:[
//    new webpack.DefinePlugin({
//      'process.env':{
//        'NODE_ENV': JSON.stringify('production')
//      }
//    }),
//    new webpack.optimize.UglifyJsPlugin({
//      compress:{
//        warnings: true
//      }
//    })
//  ],
  devtool: 'source-map',
  devServer: {
    host: 'localhost',
//    noInfo: true,
    port: 3000,
    inline: true,
    contentBase: __dirname + '/public',
  },
  watch: true
}