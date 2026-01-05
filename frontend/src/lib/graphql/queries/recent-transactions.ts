import { gql } from '@apollo/client';

export const GET_RECENT_TRANSACTIONS = gql`
  query GetRecentTransactions {
    listTransactions(filters: { perPage: 2, page: 1 }) {
      transactions {
        id
        type
        description
        date
        amount
        category {
          id
          title
          icon
          color
        }
      }
      total
    }
  }
`;
