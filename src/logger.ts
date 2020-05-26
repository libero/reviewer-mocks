export const logger = {
    info: (msg: string): void => {
        const d = new Date();
        console.log(`${d.toTimeString().split(' ')[0]}:  ${msg}`);
    },
};
