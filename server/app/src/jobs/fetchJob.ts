import { fetchChannel } from "../fetchChannel";
import { getAllSubscribes } from "../subscribes";

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
        const subscribes = await getAllSubscribes();
        await Promise.all(subscribes.map(async subs => await fetchChannel(subs)));
        this.last = new Date();
    }
}