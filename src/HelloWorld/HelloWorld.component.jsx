// @flow
import * as React from 'react';
import { Suspense } from 'react';
import { lazily } from 'react-lazily';
import styled from 'styled-components';

import * as styles from './HelloWorld.style.js';

const Content = styled.p`${styles.content}`;

const { Messenger } = lazily(() => import('./Messenger'));

export const HelloWorld: React.ComponentType<any> = () => (
  <Suspense fallback={<p>Waiting for message...</p>}>
    <Content>
      {'To get started, edit '}
      <code>
        src/HelloWorld/HelloWorld.component.jsx
      </code>
      {' and save to reload.'}
    </Content>
    <Messenger />
  </Suspense>
);
