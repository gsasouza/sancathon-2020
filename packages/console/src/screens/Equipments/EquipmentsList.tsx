import * as React from 'react';
import dayjs from 'dayjs';
import { Card, ContentHeader, Table } from '@sancathon/ui';
import { graphql, usePaginationFragment, usePreloadedQuery } from 'react-relay/hooks';

import { EquipmentsListPaginationQuery } from './__generated__/EquipmentsListPaginationQuery.graphql';

const tableColumns = [
  {
    header: { label: 'Nome' },
    property: 'name',
  },
  {
    header: { label: 'Última manutenção' },
    property: 'lastMaintenance',
    renderRow: ({ lastMaintenance }) => {
      if (!lastMaintenance) return <> - </>;
      return <>{dayjs(parseInt(lastMaintenance)).format('DD/MM/YYYY')}</>;
    },
  },
];

const Equipments = ({ preloadedQuery }) => {
  const query = usePreloadedQuery(EquipmentsListQuery, preloadedQuery);
  const { data } = usePaginationFragment<EquipmentsListPaginationQuery, any>(fragment, query);
  return (
    <>
      <ContentHeader title="Equipamentos" />
      <Card>
        <Table columns={tableColumns} data={data.equipments} />
      </Card>
    </>
  );
};

const fragment = graphql`
  fragment EquipmentsList_equipments on Query
    @argumentDefinitions(first: { type: Int }, after: { type: String }, search: { type: String })
    @refetchable(queryName: "EquipmentsListPaginationQuery") {
    equipments(first: $first, after: $after, search: $search)
      @connection(key: "EquipmentsList_equipments", filters: ["search"]) {
      count
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
      edges {
        cursor
        node {
          id
          name
          lastMaintenance
        }
      }
    }
  }
`;

const EquipmentsListQuery = graphql`
  query EquipmentsListQuery($first: Int, $after: String, $search: String) {
    ...EquipmentsList_equipments @arguments(first: $first, after: $after, search: $search)
  }
`;

export default Equipments;
