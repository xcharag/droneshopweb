import { gql } from '@apollo/client';

export const VALIDATE_TOKEN = gql`
  query ValidateToken {
      validateToken {
        status
        type
      }
  }  
`;