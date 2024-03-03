// @flow
import * as React from 'react';
import { HelloWorld } from '@psychobolt/react-rollup-boilerplate';

import { App } from 'stories/shared/App/index.js';

const code = `
// Example code 
import { createRoot } from 'react-dom/client';
import { HelloWorld } '@psychobolt/react-rollup-boierplate';

const root = createRoot(document.getElementById('root'));
root.render(<HelloWorld />);
`;

export default {
  title: 'packages/core',
  component: HelloWorld,
  // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
  layout: 'fullscreen',
  parameters: {
    docs: {
      source: {
        code
      }
    }
  }
};

type Story = {
  render: () => React.Node
};

export const Example: Story = {
  render: () => <App><HelloWorld /></App>,
};
