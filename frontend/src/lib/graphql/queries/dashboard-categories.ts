import { gql } from '@apollo/client';

export const GET_DASHBOARD_CATEGORIES = gql`
  query GetDashboardCategories($limit: Int) {
    listCategories(limit: $limit) {
      categories {
        id
        title
        icon
        color
        transactionCount
        totalAmount
      }
    }
  }
`;
