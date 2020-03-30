import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type File {
        id: String
        type: String
        filename: String
        url: String
        mimeType: String
        size: Int
        status: String
    }

    type Submission {
        id: ID!
        updated: String!
        articleType: String!
        author: AuthorDetails
        manuscriptDetails: ManuscriptDetails
        files: FileDetails
        editors: EditorDetails
        disclosure: DisclosureDetails
        suggestions: [Suggestion]
    }

    type AuthorDetails {
        firstName: String!
        lastName: String!
        email: String!
        institution: String!
    }
    type FileDetails {
        manuscriptFile: File
        supportingFiles: [File]
        coverLetter: String
    }
    type EditorDetails {
        opposedSeniorEditorsReason: String
        opposedReviewingEditorsReason: String
        opposedReviewersReason: String
    }
    type DisclosureDetails {
        submitterSignature: String
        disclosureConsent: Boolean
    }
    input AuthorDetailsInput {
        firstName: String!
        lastName: String!
        email: String!
        institution: String!
    }
    type ManuscriptDetails {
        title: String
        subjects: [String]
        previouslyDiscussed: String
        previouslySubmitted: String
        cosubmission: [String!]
    }
    type Suggestion {
        fieldName: String!
        value: String!
    }
    input ManuscriptDetailsInput {
        title: String
        subjects: [String]
        previouslyDiscussed: String
        previouslySubmitted: String
        cosubmission: [String!]
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

    type UploadProgress {
        userId: ID!
        filename: String!
        fileId: ID!
        percentage: String!
        type: String!
    }

    type Mutation {
        startSubmission(articleType: String!): Submission!
        changeSubmissionTitle(id: ID!, title: String!): Submission!
        deleteSubmission(id: ID!): ID
        saveAuthorPage(id: ID!, details: AuthorDetailsInput!): Submission!
        saveFilesPage(id: ID!, coverLetter: String): Submission!
        saveDetailsPage(id: ID!, details: ManuscriptDetailsInput!): Submission!
        uploadManuscript(id: ID!, file: Upload!, fileSize: Int!): Submission!
        uploadSupportingFile(id: ID!, file: Upload!, fileSize: Int!): Submission!
    }

    type Subscription {
        fileUploadProgress(submissionId: ID!): UploadProgress
    }
`;
