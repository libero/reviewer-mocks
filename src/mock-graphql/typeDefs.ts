import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type File {
        id: ID!
        created: DateTime!
        updated: DateTime
        type: String
        label: String
        filename: String
        url: String
        mimeType: String
        size: Int
        status: String!
        downloadLink: String!
    }

    type Submission {
        id: ID!
        updated: String!
        articleType: String!
        author: AuthorDetails
        manuscriptDetails: ManuscriptDetails
        files: FileDetails
        editorDetails: EditorDetails
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
        suggestedSeniorEditors: [ID]
        opposedSeniorEditors: [ID]
        opposedSeniorEditorsReason: String
        suggestedReviewingEditors: [ID]
        opposedReviewingEditors: [ID]
        opposedReviewingEditorsReason: String
        suggestedReviewers: [ReviewerAlias]
        opposedReviewers: [OpposedReviewer]
        opposedReviewersReason: String
    }
    input EditorDetailsInput {
        suggestedSeniorEditors: [ID]
        opposedSeniorEditors: [ID]
        opposedSeniorEditorsReason: String
        suggestedReviewingEditors: [ID]
        opposedReviewingEditors: [ID]
        opposedReviewingEditorsReason: String
        suggestedReviewers: [ReviewerAliasInput]
        opposedReviewers: [OpposedReviewerInput]
        opposedReviewersReason: String
    }
    type ReviewerAlias {
        name: String
        email: String
    }

    input ReviewerAliasInput {
        name: String
        email: String
    }

    input OpposedReviewerInput {
        name: String
        email: String
    }

    type OpposedReviewer {
        name: String
        email: String
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

    type SurveyResponse {
        id: ID!
        created: DateTime!
        updated: DateTime
        surveyId: String!
        manuscriptId: ID!
        response: SurveyQuestionsAndAnswers
    }

    type SurveyQuestionsAndAnswers {
        questions: [SurveyQuestion!]
        answers: [SurveyAnswer!]
    }

    type SurveyQuestion {
        id: ID!
        question: String!
    }

    type SurveyAnswer {
        questionId: ID!
        answer: String!
    }

    input InputSurveyAnswer {
        questionId: ID!
        text: String!
        answer: String!
    }

    type Mutation {
        startSubmission(articleType: String!): Submission!
        deleteSubmission(id: ID!): ID
        submitSurveyResponse(surveyId: String, submissionId: String, answers: [InputSurveyAnswer]!): SurveyResponse!
        saveEditorPage(id: ID!, details: EditorDetailsInput!): Submission!
        saveAuthorPage(id: ID!, details: AuthorDetailsInput!): Submission!
        uploadManuscript(id: ID!, file: Upload!, fileSize: Int!): Submission!
        deleteManuscript(fileId: ID!, submissionId: ID!): Boolean!
        uploadSupportingFile(id: ID!, file: Upload!, fileSize: Int!): File!
        deleteSupportingFile(fileId: ID!, submissionId: ID!): String!
        saveFilesPage(id: ID!, coverLetter: String): Submission!
        saveDetailsPage(id: ID!, details: ManuscriptDetailsInput!): Submission!
        submit(id: ID!): Submission!
    }

    type Subscription {
        fileUploadProgress(submissionId: ID!): UploadProgress
    }
`;
