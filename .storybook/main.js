import { join, dirname } from 'path';
import { createRequire } from 'module';
import { merge as mergeConfig } from 'webpack-merge';

import defaultConfig, { styleRules } from './webpack.config.js';

const require = createRequire(import.meta.url);

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(moduleId) {
  return dirname(require.resolve(join(moduleId, 'package.json')));
}

const mainDir = '@(src|stories)';

export default {
  stories: [
    `../${mainDir}/**/*.mdx`,
    `../${mainDir}/**/*.stories.@(js|jsx)`,
    '../stories/packages/*/stories.jsx',
  ],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-interactions'),
    {
      name: getAbsolutePath('@storybook/addon-styling-webpack'),
      options: {
        rules: styleRules,
      },
    },
  ],
  docs: {
    autodocs: true,
  },
  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {
      build: {
        test: {
          disableTreeShaking: true,
          disableSourcemaps: true,
        },
      },
    },
  },
  webpackFinal: config => mergeConfig(config, defaultConfig),
};
