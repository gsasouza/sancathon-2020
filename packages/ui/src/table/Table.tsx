import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { TableProps } from './types';

import * as React from 'react';
import styled from 'styled-components';

const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  display: flex;
  flex-direction: column;
`;

function Table<T>({ columns, data, onRowClick, footer }: TableProps<T>) {
  if (!data) return <span>Nenhum resultado a ser exibido</span>
  return (
    <TableContainer>
      <TableHeader columns={columns} />
      <TableBody data={data} columns={columns} onRowClick={onRowClick} />
      {footer}
    </TableContainer>
  );
}

export default Table;
