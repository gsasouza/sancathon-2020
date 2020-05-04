import * as React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { TextButton, getLightenDarkenColor } from '@sancathon/ui';

const Header = styled.header`
  height: 3.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.44);
  background-color: ${props => getLightenDarkenColor(props.theme.palette.primary, -30) + 'c4'};
  display: flex;
  position: absolute;
  top: 0;
  width: calc(100% - 1rem);
  align-items: center;
  padding-left: 1rem;
`;

const Nav = styled.nav`
  margin: 0 auto 0 1.5rem;
`;

const LadingPageHeader = () => {
  const history = useHistory();
  return (
    <Header>
      {/*<Logo src="https://via.placeholder.com/120x40/B9D6F2" />*/}
      <Nav />
      <TextButton color="secondary" onClick={() => history.push('/login')}>
        Login
      </TextButton>
    </Header>
  );
};

export default LadingPageHeader;
