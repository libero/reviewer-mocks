import { withFilter, PubSub, ResolverFn } from 'apollo-server-express';

export const fileUploadProgress = (pubsub: PubSub): { subscribe: ResolverFn } => ({
    subscribe: withFilter(
        () => pubsub.asyncIterator('UPLOAD_STATUS'),
        (payload, variables, context) => {
            // Please note that mocks does not filter on user id as this context is never set.
            // Reviewer-submssions does use the userid
            return payload.fileUploadProgress.submissionId === variables.submissionId;
        },
    ),
});