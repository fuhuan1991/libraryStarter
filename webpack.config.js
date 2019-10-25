const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.jsx', '.json', '.less' ]
  },
  module: {
    rules: [
      {
        test: /\.(tsx|js|ts)/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ],
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'less-loader',
          options: { javascriptEnabled: true }
        }]
      },
      {
        test: /jsoneditor-icons\.svg/,
        use: 'file-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: 'file-loader?name=img-[sha512:hash:base64:7].[ext]'
      }
    ]
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 9000,
  }
};
