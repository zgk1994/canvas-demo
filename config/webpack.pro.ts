process.env.NODE_ENV = 'production';

import webpack from 'webpack';
import merge from 'webpack-merge';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackAssertPlugin from '../plugins/html-webpack-assert-plugin';
import { resolveByRootDir, DIST } from '../script/util';
import baseConfig, { indexEntry } from './webpack.base';

const config: webpack.Configuration = {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    splitChunks: {},
    minimize: true,
  },
  plugins: [
    new CleanWebpackPlugin([DIST], { root: resolveByRootDir() }),
    new HtmlWebpackAssertPlugin({
      title: 'canvas demo',
      chunks: [indexEntry],
    }),
  ],
};

export default merge(baseConfig, config);
