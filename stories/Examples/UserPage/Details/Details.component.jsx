// @flow
import * as React from 'react';
import styled from 'styled-components';

import { Picture } from './Picture/index.js';
import * as styles from './Details.style.js';

const Container = styled.div`
  ${styles.container}
`;

const Name = styled.div`
  ${styles.name}
`;

type Props = {
  image: string,
  name: string
};

export const Details: React.ComponentType<Props> = ({ image, name }) => (
  <Container>
    <Picture source={image} />
    <Name>{name}</Name>
  </Container>
);
