import { logs } from '../odm';

export class Logs {
    constructor(data) {
        const logData = {
            method:   data.method,
            path:     data.originalUrl,
            duration: {
                start: data.body.duration?.started,
                end:   data.body.duration?.closed,
            },
            payload: data.body,
            agent:   data.headers[ 'user-agent' ],
        };
        this.data = logData;
    }

    async create() {
        const data = await logs.create(this.data);

        return data;
    }
}
