import * as React from 'react';
import Board from '@lourenci/react-kanban';
import styled from 'styled-components';
import Card from './Card';

const Container = styled.div`
  .sc-fzoXzr {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    width: 100%;
    grid-column-gap: 0.5rem;
  }
  .sc-fzoLsD {
    overflow: auto;
    max-height: calc(100vh - 175px);
  }
  .sc-fznKkj {
    font-size: 18px;
    color: ${props => props.theme.palette.primary};
    border-bottom: 1px solid ${props => props.theme.palette.secondary};
    margin-bottom: 0.5rem;
    text-align: center;
  }
  .sc-AxirZ {
    width: calc(100% - 0.2rem);
  }
  .sc-fzozJi {
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    height: calc(100vh - 9rem);
    background: #fffef8;
  }
`;

const mockedCards = [
  {
    id: 1,
    title: 'Add card',
    description: 'Add capability to add a card in a column',
  },
  {
    id: 1,
    title: 'Add card',
    company: 'UBER_EATS',
    description: 'Add capability to add a card in a column',
  },
  {
    id: 1,
    title: 'Add card',
    company: 'UBER_EATS',
    description: 'Add capability to add a card in a column',
  },
  {
    id: 1,
    title: 'Add card',
    description: 'Add capability to add a card in a column',
  },
  {
    id: 1,
    title: 'Add card',
    description: 'Add capability to add a card in a column',
  },
  {
    id: 1,
    title: 'Add card',
    description: 'Add capability to add a card in a column',
  },
  {
    id: 1,
    title: 'Add card',
    description: 'Add capability to add a card in a column',
  },
  {
    id: 1,
    title: 'Add card',
    description: 'Add capability to add a card in a column',
  },
];

const board = {
  columns: [
    {
      id: 'new',
      title: 'Novos Pedidos',
      cards: mockedCards,
    },
    {
      id: 'inProgress',
      title: 'Em Andamento',
      cards: mockedCards,
    },
    {
      id: 'waiting',
      title: 'Aguardando Entrega',
      cards: mockedCards,
    },
    {
      id: 'finished',
      title: 'Finalizados',
      cards: [
        {
          id: 4,
          title: 'Drag-n-drop support',
          description: 'Move a card between the columns',
        },
        {
          id: 4,
          title: 'Drag-n-drop support',
          description: 'Move a card between the columns',
        },
      ],
    },
    {
      id: 'aborted',
      title: 'Cancelados',
      cards: [
        {
          id: 5,
          title: 'Drag-n-drop support',
          description: 'Move a card between the columns',
        },
      ],
    },
  ],
};

const OrderPanel = () => {
  return (
    <Container>
      <Board initialBoard={board} renderCard={Card} disableColumnDrag={true} />
    </Container>
  );
};

export default OrderPanel;
