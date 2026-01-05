import { gql } from '@apollo/client';

export const GET_TOTAL_TRANSACTIONS = gql`
  query GetTotalTransactions {
    listCategories {
      totalTransactions
    }
  }
`;
