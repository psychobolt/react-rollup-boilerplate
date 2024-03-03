import React from 'react';
import { render } from '@testing-library/react';

import { Messenger } from '../Messenger.component.jsx';

test('component <Messenger /> should render correctly', () => {
  render(<Messenger />);
});
