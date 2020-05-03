import * as React from 'react';
import { Card, ContentHeader, Table } from '@sancathon/ui';
import { graphql, usePaginationFragment, usePreloadedQuery } from 'react-relay/hooks';

import { ProductsListPaginationQuery } from './__generated__/ProductsListPaginationQuery.graphql';

const tableColumns = [
  {
    header: { label: 'Nome' },
    property: 'name',
  },
  {
    header: { label: 'Descrição' },
    property: 'description',
  },
  {
    header: { label: 'Valor' },
    property: 'price',
  },
];

const Products = ({ preloadedQuery }) => {
  const query = usePreloadedQuery(ProductsListQuery, preloadedQuery);
  const { data } = usePaginationFragment<ProductsListPaginationQuery, any>(fragment, query);
  return (
    <>
      <ContentHeader title="Serviços" />
      <Card>
        <Table columns={tableColumns} data={data.products} />
      </Card>
    </>
  );
};

const fragment = graphql`
  fragment ProductsList_equipments on Query
    @argumentDefinitions(first: { type: Int }, after: { type: String }, search: { type: String })
    @refetchable(queryName: "ProductsListPaginationQuery") {
    products(first: $first, after: $after, search: $search)
      @connection(key: "ProductsList_products", filters: ["search"]) {
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
          price
          description
        }
      }
    }
  }
`;

const ProductsListQuery = graphql`
  query ProductsListQuery($first: Int, $after: String, $search: String) {
    ...ProductsList_equipments @arguments(first: $first, after: $after, search: $search)
  }
`;

export default Products;
