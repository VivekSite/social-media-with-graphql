import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query Query {
    posts {
      authorId
      createdAt
      id
      image
      message
      title
      updatedAt
    }
  }
`;
