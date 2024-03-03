// @flow
import * as React from 'react';

export const Messenger: React.ComponentType<any> = () => {
  /* istanbul ignore next */
  if (process.env.NODE_ENV === 'development') {
    console.log('DEVELOPMENT sources are loaded'); // eslint-disable-line no-console
  }
  console.log('Hello World!'); // eslint-disable-line no-console
  return null;
};
