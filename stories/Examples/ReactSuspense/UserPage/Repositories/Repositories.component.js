// @flow
import * as React from 'react';
import { unstable_createResource as createResource } from 'react-cache';
import styled from 'styled-components';

import { fetchUserRepositories } from '../api/index.js';
import Repostory from './Repository/index.js';
import * as styles from './Repositories.style.js';

const UserRepositoriesResource = createResource(fetchUserRepositories);

const List = styled.ul`
  ${styles.list}
`;

type Props = {
  id: string;
}

export default ({ id }: Props): React.Node => {
  const repos = UserRepositoriesResource.read(id);
  return (
    <List>
      {repos.map(repo => <Repostory key={repo.name} {...repo} />)}
    </List>
  );
};
