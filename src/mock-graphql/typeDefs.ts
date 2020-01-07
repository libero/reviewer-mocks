import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type Submission {
        id: ID!
        title: String!
        updated: String!
    }

    type User {
        id: ID!
        name: String!
        role: String!
    }

    type Query {
        getSubmissions: [Submission!]!
        getSubmission(id: ID!): Submission
    }

    type Mutation {
        startSubmission: Submission!
        changeSubmissionTitle(id: ID!, title: String!): Submission!
        deleteSubmission(id: ID!): Boolean
    }
`;
