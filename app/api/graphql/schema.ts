export const typeDefs = `#graphql
    type Post {
        id: ID!
        title: String
        message: String
        image: String
        author: User
        authorId: String

        createdAt: String
        updatedAt: String
    }

    type User {
        id: ID!
        name: String
        email: String
        password: String

        createdAt: String
        updatedAt: String

        posts: [Post]
    }

    type Query {
        posts: [Post]
        post(id: ID!): Post

        users: [User]
        userById(id: ID!): User
        userByEmail(email: String): User
    }
`;
