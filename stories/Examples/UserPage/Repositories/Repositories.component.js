// @flow
import * as React from 'react';
import { unstable_createResource as createResource } from 'react-cache';
import styled from 'styled-components';

import { fetchUserRepositories } from '../api/index.js';
import { Repository } from './Repository/index.js';
import * as styles from './Repositories.style.js';

const UserRepositoriesResource = createResource(fetchUserRepositories);

const List = styled.ul`
  ${styles.list}
`;

type Props = {
  id: string;
}

export const Repositories: React.ComponentType<Props> = ({ id }) => {
  const repos = UserRepositoriesResource.read(id);
  return (
    <List>
      {repos.map(repo => <Repository key={repo.name} {...repo} />)}
    </List>
  );
};
