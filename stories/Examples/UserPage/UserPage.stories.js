// @flow
import code from '!./UserPage.component.jsx?raw';
import { UserPage } from './UserPage.component.jsx';

const meta = {
  title: 'Examples/User Page',
  render: UserPage,
  parameters: {
    chromatic: { delay: 20 },
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
    docs: {
      source: {
        code,
      },
    },
  },
};

export default meta;

export const Example = {};
