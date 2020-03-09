import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type File {
        id: string
        type: string
        filename: string
        url: string
        mimeType: string
        size: number
        status: string
    }

    type Submission {
        id: ID!
        title: String!
        updated: String!
        articleType: String!
        author: AuthorDetails
        coverLetter: String
        manuscriptFile: File
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
        saveFilesPage(id: ID!, coverLetter: String!): Submission!
        uploadManuscript(id: ID!, file: Upload!, fileSize: Int!): Submission!
    }
`;
