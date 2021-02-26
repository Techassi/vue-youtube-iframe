/**
 * RegisterFunc defines a callback function which is used when registering a new player
 */
export type RegisterFunc = (factory: any, uid: string) => void;

/**
 * EventsTree defines a lookup table for events emitted by the youtube player
 */
export interface EventsTree {
    [key: string]: string;
}

/**
 * Manager keeps track of player events and player instances
 */
export class Manager {
    private players!: Array<RegisterFunc>;
    private events!: EventsTree;
    private factory!: any;
    private uid!: number;

    public constructor() {
        this.events = {};
        this.events[YT.PlayerState.ENDED] = 'ended';
        this.events[YT.PlayerState.PLAYING] = 'playing';
        this.events[YT.PlayerState.PAUSED] = 'paused';
        this.events[YT.PlayerState.BUFFERING] = 'buffering';
        this.events[YT.PlayerState.CUED] = 'cued';
    }

    public registerFactory(factory: any): void {
        this.factory = factory;
    }

    public register(callback: RegisterFunc): void {
        this.uid++;

        if (this.factory != undefined) {
            callback(this.factory, `vue-youtube-iframe-${this.uid}`);
            return;
        }

        this.players.push(callback);
    }

    public runQueue(): void {
        this.players.forEach((callback) => {
            if (this.factory != undefined) {
                this.uid++;
                callback(this.factory, `vue-youtube-iframe-${this.uid}`);
            }

            this.players = [];
        });
    }

    public getEvent(key: string): string {
        return this.events[key];
    }
}

/**
 * createManager creates and returns the default manager
 */
export function createManager(): Manager {
    return new Manager();
}

const manager = createManager();
Object.freeze(manager);

export default manager;
