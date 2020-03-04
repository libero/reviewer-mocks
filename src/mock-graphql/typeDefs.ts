import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type Submission {
        id: ID!
        title: String!
        updated: String!
        articleType: String!
        author: AuthorDetails!
    }

    type AuthorDetails {
        firstName: String!
        lastName: String!
        email: String!
        institution: String!
    }

    input AuthorDetailsInput {
        firstName: String!
        lastName: String!
        email: String!
        institution: String!
    }

    type User {
        id: ID!
        name: String!
        role: String!
        aff: String!
        email: String!
    }

    type Query {
        getSubmissions: [Submission!]!
        getSubmission(id: ID!): Submission
        getCurrentUser: User!
    }

    type Mutation {
        startSubmission(articleType: String!): Submission!
        changeSubmissionTitle(id: ID!, title: String!): Submission!
        deleteSubmission(id: ID!): ID
        saveDetailsPage(id: ID!, details: AuthorDetailsInput!): Submission!
        uploadManuscript(id: ID!, file: Upload!, fileSize: Int!): Submission!
    }
`;
