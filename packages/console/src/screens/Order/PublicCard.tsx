import * as React from 'react';
import styled from 'styled-components';
import { getLogo, Header as BaseHeader, Logo as BaseLogo } from './Card';

const Card = styled.div`
  padding: 1rem;
  margin: 0.5rem;
  width: 295px;
  height: 150px;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  background: #fffef8;
  > h1 {
    font-size: 30px;
  }
`;

const Logo = styled(BaseLogo)`
  width: 4rem;
  height: 4rem;
  margin: 0 0 0 auto !important;
`;

const Header = styled(BaseHeader)`
  padding: 0;
  justify-content: space-between;
`;

const PublicCard = ({ reference, restaurant, company }) => {
  const logo = getLogo(company);
  return (
    <Card>
      <Header>
        <h1>{reference}</h1>
        <Logo src={logo} />
      </Header>
      <h1>{restaurant}</h1>
    </Card>
  );
};

export default PublicCard;
