import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;