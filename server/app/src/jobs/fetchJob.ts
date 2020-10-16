import { fetchSubscribes } from "../fetchChannel";

export class FetchJob {
    public interval: number;
    public last: Date;
    private i: NodeJS.Timeout;

    constructor(interval: number) {
        this.setInterval(interval);
    }

    public setInterval = (interval: number) => {
        this.interval = interval;
        clearInterval(this.i);
        this.i = setInterval(async () => await this.check(), interval);
    }

    public check = async () => {
        await fetchSubscribes();
        this.last = new Date();
    }
}