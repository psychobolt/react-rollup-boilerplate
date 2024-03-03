// @flow
import code from '!./Flexbox.component.jsx?raw';
import { Flexbox } from './Flexbox.component.jsx';

export default {
  title: 'Examples/Flexbox',
  render: Flexbox,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
    docs: {
      source: {
        code,
      },
    },
  },
};

export const Example = {};
