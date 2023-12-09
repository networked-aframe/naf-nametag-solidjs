const path = require('path');

module.exports = {
  entry: {
    components: './src/components.js',
    ui: './src/ui.tsx',
  },
  output: {
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'public/dist'),
    publicPath: '/dist/',
    filename: '[name].js',
  },
  externals: {
    // Stubs out `import ... from 'three'` so it returns `import ... from window.THREE` effectively using THREE global variable that is defined by AFRAME.
    three: 'THREE',
  },
  devtool: 'source-map',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-typescript', 'solid'],
            env: {
              development: {
                plugins: [['solid-refresh/babel', { bundler: 'webpack5' }]],
              },
            },
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  devServer: {
    // port: process.env.PORT || 5000,
    liveReload: false,
    hot: true,
    watchFiles: ['src/**'],
    //    server: {
    //      type: 'https'
    //    },
    static: ['public'],
  },
};
