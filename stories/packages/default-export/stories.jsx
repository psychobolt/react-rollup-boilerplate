// @flow
import DefaultExport from '@psychobolt/default-export';

const code = `
// Example code 
import { createRoot } from 'react-dom/client';
import DefaultExport from '@psychobolt/default-export';

const root = createRoot(document.getElementById('root'));
root.render(<DefaultExport />);
`;

export default {
  title: 'packages/default-export',
  component: DefaultExport,
  parameters: {
    docs: {
      description: {
        component: 'Default import that only logs into console',
      },
      source: {
        code
      },
    },
  },
};

export const Default = {};
