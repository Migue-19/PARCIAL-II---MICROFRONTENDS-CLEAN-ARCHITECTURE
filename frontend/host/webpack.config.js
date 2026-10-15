const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/main.ts',
  mode: 'development',
  devtool: 'source-map',
  output: {
    publicPath: 'auto',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: path.resolve(__dirname, 'tsconfig.app.json')
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
      }
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        mfeProducts: 'mfeProducts@http://localhost:4201/remoteEntry.js',
        mfeOrders: 'mfeOrders@http://localhost:4202/remoteEntry.js',
        mfeCustomers: 'mfeCustomers@http://localhost:4203/remoteEntry.js',
      },
      shared: {
        '@angular/core': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@angular/common': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@angular/common/http': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@angular/router': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        rxjs: { singleton: true, strictVersion: true, requiredVersion: 'auto' },
      },
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  devServer: {
    port: 4200,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};
