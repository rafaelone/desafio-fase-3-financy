import { gql } from '@apollo/client';

export const GET_MOST_USED_CATEGORY = gql`
  query GetMostUsedCategory {
    listCategories {
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
