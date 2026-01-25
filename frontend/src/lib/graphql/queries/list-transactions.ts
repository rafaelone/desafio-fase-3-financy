import { gql } from '@apollo/client';

export const LIST_TRANSACTIONS = gql`
  query ListTransactions($filters: TransactionFilterInput) {
    listTransactions(filters: $filters) {
      transactions {
        id
        type
        description
        date
        amount
        categoryId
        category {
          id
          title
          icon
          color
        }
        createdAt
      }
      total
      totalPages
    }
  }
`;
