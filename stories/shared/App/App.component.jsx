// @flow
import * as React from 'react';
import styled from 'styled-components';

import * as styles from './App.style.js';
import logo from './logo.svg';

type Props = {
  children: any
};

const Logo = styled.img`
  ${styles.logo}
`;

const Header = styled.header`
  ${styles.header}
`;

const Title = styled.h1`
  ${styles.h1}
`;

const Container = styled.div`
  ${styles.container}
`;

export const App: React.ComponentType<Props> = ({ children }) => (
  <Container>
    <Header>
      <Logo src={logo} alt="logo" />
      <Title>Welcome to React</Title>
    </Header>
    {children}
  </Container>
);
