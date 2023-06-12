const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Generates an HTML file from a template and injects the generated bundles
      new HtmlWebpackPlugin({
        template: './index.html',
      }),

      // Generates a Web App Manifest file for the Progressive Web App (PWA)
      new WebpackPwaManifest({
        name: 'JATE Text Editor',
        short_name: 'JATE',
        description: 'A text editor for creating and storing notes or code snippets.',
        background_color: '#ffffff',
        theme_color: '#000000',
        start_url: '/',
        icons: [
          {
            src: path.resolve('src/images/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
        fingerprints: true, // Add fingerprints to generated assets
        inject: true, // Inject the manifest into the HTML file
        publicPath: '/', // Specify the public path for assets referenced in the manifest
      }),

      // Injects a service worker into the webpack build
      new InjectManifest({
        swSrc: './src/js/service-worker.js',
        swDest: 'service-worker.js',
      }),
    ],

    module: {
      rules: [
        // Handles CSS files
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        // Transpiles JavaScript files using Babel
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
