import * as React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { TextButton, getLightenDarkenColor } from '@sancathon/ui';

const Header = styled.header`
  height: 3.5rem;
  border-bottom: 1px solid black;
  background-color: ${props => props.theme.palette.accent};
  display: flex;
  align-items: center;
  padding-left: 1rem;
  justify-content: flex-start;
  position: sticky;
  top: 0;
`;

const Logo = styled.img`
  border-radius: 30px;
`;

const NavItem = styled.a`
  color: ${props => props.theme.palette.secondary};
  font-size: 14px;
  font-weight: bold;
  margin: 0 0.5rem;
  cursor: pointer;
  &:hover {
    color: ${props => getLightenDarkenColor(props.theme.palette.secondary, 30)};
    text-decoration: underline;
  }  
`;

const Nav = styled.nav`
  margin: 0 auto 0 1.5rem;
  
`;

const LadingPageHeader = () => {
  const history = useHistory();
  return (
    <Header>
      <Logo src="https://via.placeholder.com/120x40/B9D6F2"/>
      <Nav>
        <NavItem>HOME</NavItem>
        <NavItem>SOBRE</NavItem>
        <NavItem>CONTATO</NavItem>
      </Nav>
      <TextButton color="secondary" onClick={() => history.push('/login')}>
        Login
      </TextButton>
    </Header>
  );
};

export default LadingPageHeader;
