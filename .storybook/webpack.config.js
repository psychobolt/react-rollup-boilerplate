import { SourceMapDevToolPlugin } from 'webpack';
import { merge as mergeConfig } from 'webpack-merge';

const cssModuleOptions = {
  modules: {
    exportLocalsConvention: 'camelCase',
  },
};

const getCSSLoaders = cssModule => [
  require.resolve('style-loader'),
  {
    loader: require.resolve('css-loader'),
    options: {
      sourceMap: true,
      ...(cssModule ? cssModuleOptions : undefined),
    },
  },
];

export const styleRules = [
  {
    test: /\.css$/,
    exclude: /\.module\.css$/,
    use: getCSSLoaders(),
  },
  {
    test: /\.module\.css$/,
    use: getCSSLoaders(true),
  },
  {
    test: /\.scss$/,
    exclude: /\.module\.scss$/,
    use: [
      ...getCSSLoaders(),
      require.resolve('sass-loader'),
    ],
  },
  {
    test: /\.module\.scss$/,
    use: [
      ...getCSSLoaders(true),
      require.resolve('sass-loader'),
    ],
  },
];

let config = {}; // eslint-disable-line import/no-mutable-exports

if (process.env.BABEL_ENV === 'development') {
  config = mergeConfig(config, {
    plugins: [
      new SourceMapDevToolPlugin({
        test: /jsx?.iframe.bundle.js$/,
        exclude: /^vendors-.+$/,
        filename: '[file].map',
        moduleFilenameTemplate: 'webpack://[namespace]/[absolute-resource-path]',
        module: false,
      }),
    ],
    module: {
      rules: [
        {
          test: [/\.c?js$/, /\.mjs$/, /\.jsx/],
          loader: require.resolve('source-map-loader'),
          enforce: 'pre',
        },
      ],
    },
  });
}

export default config;
