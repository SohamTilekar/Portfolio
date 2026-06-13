import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/asserts', to: 'asserts' },
        { from: 'src/Resume', to: 'Resume', noErrorOnMissing: true },
        { from: 'src/Resume-RISCV-Ext-Landscape', to: 'Resume-RISCV-Ext-Landscape', noErrorOnMissing: true },
        { from: 'src/Resume-Java-Internship', to: 'Resume-Java-Internship', noErrorOnMissing: true },
      ],
    }),
  ],
  devServer: {
    static: './dist',
    historyApiFallback: true,
    open: true,
    hot: true,
  },
};
