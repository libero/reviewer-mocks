import { withFilter, PubSub, ResolverFn } from 'apollo-server-express';

export const supportingUploadProgress = (pubsub: PubSub): { subscribe: ResolverFn } => ({
    subscribe: withFilter(
        () => pubsub.asyncIterator('UPLOAD_STATUS'),
        (payload, variables, context) => {
            return (
                payload.supportingUploadProgress.filename === variables.filename &&
                payload.supportingUploadProgress.userId === context.userId
            );
        },
    ),
});
