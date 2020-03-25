import { withFilter, PubSub, ResolverFn } from 'apollo-server-express';

export const manuscriptUploadProgress = (pubsub: PubSub): { subscribe: ResolverFn } => ({
    subscribe: withFilter(
        () => pubsub.asyncIterator('UPLOAD_STATUS'),
        (payload, variables, context) => {
            return (
                payload.manuscriptUploadProgress.filename === variables.filename &&
                payload.manuscriptUploadProgress.userId === context.userId
            );
        },
    ),
});
