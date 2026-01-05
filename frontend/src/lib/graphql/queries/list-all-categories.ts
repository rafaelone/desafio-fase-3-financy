import { gql } from '@apollo/client';

export const LIST_ALL_CATEGORIES = gql`
  query ListAllCategories {
    listCategories {
      categories {
        id
        title
        description
        icon
        color
        transactionCount
        totalAmount
      }
    }
  }
`;
