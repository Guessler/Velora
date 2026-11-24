import { gql } from "@apollo/client";

export const CREATE_CATEGORY = gql`
  mutation createCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
      name
      slug
      parentId
      image
      sortOrder
      isActive
    }
  }
`;