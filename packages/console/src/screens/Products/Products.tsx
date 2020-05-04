import * as React from 'react';
import { Card, ContentHeader, Table, Checkbox } from '@sancathon/ui';
import { graphql, usePaginationFragment, usePreloadedQuery } from 'react-relay/hooks';
import { useMutation } from 'relay-hooks';

import { ProductsListPaginationQuery } from './__generated__/ProductsListPaginationQuery.graphql';

import { ProductSignMutation } from './mutations/ProductSignMutation';
import { ProductUnSignMutation } from './mutations/ProductUnSignMutation';

const formatCurrency = (value) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    value,
  )

const Products = ({ preloadedQuery }) => {
  const [signProduct] = useMutation(ProductSignMutation);
  const [unSignProduct] = useMutation(ProductUnSignMutation);

  const handleSignChange = id => e => {
    if (e.target.checked) return signProduct({ variables: { input: { id } } });
    return unSignProduct({ variables: { input: { id } } });
  };

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
      renderRow: ({ price }) => <span>{formatCurrency(price)}</span>
    },
    {
      header: { label: 'Assinado' },
      property: 'meHasSigned',
      renderRow: ({ name, meHasSigned, id }) => (
        <Checkbox value={meHasSigned} label={''} name={name} onChange={handleSignChange(id)} color="secondary" />
      ),
    },
  ];

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
          meHasSigned
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
