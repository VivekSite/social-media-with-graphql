export const typeDefs = `#graphql
    type Novel {
        id: ID!
        name: String
        title: String
        image: String
        createdAt: String
        updatedAt: String
        authors: [Author]
    }

    type Author {
        id: ID!
        name: String
        email: String
        password: String
        novelId: String
    }

    type Query {
        novels: [Novel]
        novel(id: ID!): Novel
    }

    type Mutation {
        addNovel (image:String, title:String) : Novel
        updateNovel(id:ID!, title:String, image:String) : Novel
        deleteNovel(id:ID!) : Novel

        addAuthor(
            name: String, 
            email: String, 
            password: String
            ): Author
        deleteAuthor(id:ID!): Author
    }
`;


