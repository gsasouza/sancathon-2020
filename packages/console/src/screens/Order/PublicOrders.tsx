import * as React from 'react';
import styled from 'styled-components';

import PublicCard from './PublicCard';

const Content = styled.div`
  min-height: calc(100vh - 4rem);
  width: calc(100% - 4rem);
  padding: 2rem;
  background-color: ${props => props.theme.palette.primary};
`;

const Orders = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 2rem -1rem 0;
  justify-content: flex-start;
`;

const Title = styled.h1`
  color: ${props => props.theme.palette.secondary};
  margin: 0;
  font-size: 54px;
`;

const orders = [
  {
    reference: 'Pedido #1234',
    restaurant: 'Nome Restaurante',
    company: 'IFOOD',
    kitchen: 'Cozinha 1',
  },
  {
    reference: 'Pedido #1234',
    restaurant: 'Nome Restaurante',
    company: 'UBER_EATS',
    kitchen: 'Cozinha 2',
  },
  {
    reference: 'Pedido #1234',
    restaurant: 'Nome Restaurante',
    company: 'IFOOD',
    kitchen: 'Cozinha 3',
  },
  {
    reference: 'Pedido #1234',
    restaurant: 'Nome Restaurante',
    company: 'UBER_EATS',
    kitchen: 'Cozinha 2',
  },
  {
    reference: 'Pedido #1234',
    restaurant: 'Nome Restaurante',
    company: 'IFOOD',
    kitchen: 'Cozinha 1',
  },
  {
    reference: 'Pedido #1234',
    restaurant: 'Nome Restaurante',
    company: 'UBER_EATS',
    kitchen: 'Cozinha 3',
  },
  {
    reference: 'Pedido #1234',
    restaurant: 'Nome Restaurante',
    company: 'IFOOD',
    kitchen: 'Cozinha 2',
  },
  {
    reference: 'Pedido #1234',
    restaurant: 'Nome Restaurante',
    kitchen: 'Cozinha 2',
    company: 'UBER_EATS',
  },
  {
    reference: 'Pedido #1234',
    restaurant: 'Nome Restaurante',
    kitchen: 'Cozinha 9',
    company: 'IFOOD',
  },
];

const PublicOrders = () => {
  return (
    <>
      <Content>
        <Title>Pedidos</Title>
        <Orders>
          {orders.map(order => (
            <PublicCard {...order} />
          ))}
        </Orders>
      </Content>
    </>
  );
};

export default PublicOrders;
