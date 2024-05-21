import { gql } from "@apollo/client";

export const ADD_AUTHOR = gql`
  mutation Mutation($name: String, $email: String, $password: String) {
    addAuthor(name: $name, email: $email, password: $password) {
      password
      novelId
      name
      id
      email
    }
  }
`;


