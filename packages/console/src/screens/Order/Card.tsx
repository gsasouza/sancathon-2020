import * as React from 'react';
import styled from 'styled-components';

import iFoodLogo from '../../../static/img/ifood-logo.png';
import uberEatsLogo from '../../../static/img/uber-eats-logo.png';

const Container = styled.div`
  height: 100%;
  border: 1px solid ${props => props.theme.palette.secondary};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  width: 100%;
  background-color: #ffffff;
  margin: 0.5rem 0;
`;

export const Header = styled.div`
  display: flex;
  padding: 1rem;
  align-items: center;
  * {
    color: ${props => props.theme.palette.primary};
    margin: 0 auto 0 0;
  }
`;

export const Logo = styled.img`
  width: 2rem;
  height: 2rem;
`;

const Body = styled.div`
  padding: 0 1rem 1rem;
  display: flex;
  flex-direction: column;
  > span:first-child {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
`;

const ItemRow = styled.div`
  display: flex;
  > span:last-child {
    margin-left: auto;
  }
`;

const OptionalsBody = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
  span {
    font-size: 14px;
  }
`;

export const getLogo = company => {
  if (company === 'IFOOD') return iFoodLogo;
  if (company === 'UBER_EATS') return uberEatsLogo;
  return iFoodLogo;
};

const defaultItems = [
  {
    name: 'X-Burger',
    quantity: 1,
    subItems: [
      {
        name: 'Bacon',
        quantity: 1,
      },
      {
        name: 'Queijo',
        quantity: 1,
      },
    ],
  },
  {
    name: 'Refrigerante',
    quantity: 1,
  },
];

const Card = ({ company, shortReference = 'Pedido-123', items = defaultItems }) => {
  const logo = getLogo(company);
  return (
    <Container>
      <Header>
        <h3>{shortReference}</h3>
        <Logo src={logo} />
      </Header>
      <Body>
        <span>Descrição:</span>
        {items.map(({ name, quantity, subItems }, index) => (
          <React.Fragment key={index}>
            <ItemRow>
              <span>- {name}</span>
              <span>x{quantity}</span>
            </ItemRow>
            {subItems && (
              <OptionalsBody>
                <span>Adicionais:</span>
                {subItems.map(({ name, quantity }, index) => (
                  <ItemRow key={index}>
                    <span>- {name}</span>
                    <span>x{quantity}</span>
                  </ItemRow>
                ))}
              </OptionalsBody>
            )}
          </React.Fragment>
        ))}
      </Body>
    </Container>
  );
};

export default Card;
