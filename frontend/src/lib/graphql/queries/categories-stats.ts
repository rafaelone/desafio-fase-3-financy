import { gql } from '@apollo/client';

export const GET_CATEGORIES_STATS = gql`
  query GetCategoriesStats {
    listCategories {
      totalCategories
      totalTransactions
      mostUsedCategory {
        id
        title
        icon
        color
        transactionCount
      }
    }
  }
`;
