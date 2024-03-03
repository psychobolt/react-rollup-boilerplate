// @flow
import './styles.css';
import * as React from 'react';
import { Suspense } from 'react';
import { unstable_createResource as createResource } from 'react-cache';
import { lazily } from 'react-lazily';
import styled from 'styled-components';

import { fetchContributors } from './api';
import { Details } from './Details';
import { Spinner, SIZES } from './Spinner';
import * as styles from './UserPage.style.js';

const UserDetailsResource = createResource(fetchContributors);

const Container = styled.div`${styles.container}`;

const { Repositories } = lazily(() => import('./Repositories'));

const Contributors = () => {
  const users = UserDetailsResource.read();
  if (process.env.NODE_ENV === 'development') {
    console.log('Storybook DEVELOPMENT mode enabled'); // eslint-disable-line no-console
  }
  return users.map(user => (
    <Container key={user.name}>
      <Details image={user.image} name={user.name} />
      <Suspense fallback={<Spinner size={SIZES.Medium} />}>
        <Repositories id={user.name} />
      </Suspense>
    </Container>
  ));
};

export const UserPage: React.ComponentType<any> = () => (
  <Suspense fallback={<Spinner size={SIZES.Large} />}>
    <Contributors />
  </Suspense>
);
