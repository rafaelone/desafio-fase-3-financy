import { gql } from '@apollo/client';

export const GET_TOTAL_CATEGORIES = gql`
  query GetTotalCategories {
    listCategories {
      totalCategories
    }
  }
`;
