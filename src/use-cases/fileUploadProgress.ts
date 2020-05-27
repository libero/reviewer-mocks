import { withFilter, PubSub, ResolverFn } from 'apollo-server-express';
import { logger } from '../logger';

export const fileUploadProgress = (pubsub: PubSub): { subscribe: ResolverFn } => ({
    subscribe: withFilter(
        () => pubsub.asyncIterator('UPLOAD_STATUS'),
        (payload, variables) => {
            // Please note that mocks does not filter on user id as this context is never set.
            // Reviewer-submssions does use the userid
            logger.info(`fileUploadProgress(${JSON.stringify(payload)})`);

            return payload.fileUploadProgress.submissionId === variables.submissionId;
        },
    ),
});
