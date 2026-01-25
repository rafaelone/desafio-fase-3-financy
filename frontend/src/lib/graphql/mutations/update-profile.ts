import { gql } from '@apollo/client';

export const UPDATE_USER = gql`
  mutation UpdateUser($fullName: String!) {
    updateUser(data: { fullName: $fullName }) {
      id
      fullName
      email
    }
  }
`;
