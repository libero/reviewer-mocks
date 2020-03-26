import { withFilter, PubSub, ResolverFn } from 'apollo-server-express';

export const fileUploadProgress = (pubsub: PubSub): { subscribe: ResolverFn } => ({
    subscribe: withFilter(
        () => pubsub.asyncIterator('UPLOAD_STATUS'),
        (payload, variables, context) => {
            return (
                // payload.fileUploadProgress.userId === context.userId &&
                payload.fileUploadProgress.submissionId === variables.submissionId
            );
        },
    ),
});
