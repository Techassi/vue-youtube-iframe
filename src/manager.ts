export type ManagerCallbackFunction = (factory: object, uid: string) => void;

export interface Manager {
    factory: object | undefined;
    players: Array<ManagerCallbackFunction>;
    events: Record<string, string>;
    uid: number;

    /**
     * registerFactory registers the player factory
     * @param factory The underlying YT factory (usually window.YT)
     */
    registerFactory(factory: YT.Player): void;

    /**
     * registerEvents registers all player state events
     */
    registerEvents(): void;

    /**
     * register registers a new player via the manager
     * @param callback the callback function executed when the player gets loaded into the component
     */
    register(callback: ManagerCallbackFunction): void;

    /**
     * runBacklog iterates over registered players, which were unable to initiate because the YouTube API script wasn't
     * ready yet
     */
    runBacklog(): void;
}

export function createManager(): Manager {
    return {
        factory: undefined,
        players: [],
        events: {},
        uid: 0,
        registerFactory(factory: object): void {
            this.factory = factory;
        },
        registerEvents(): void {
            this.events[YT.PlayerState.ENDED] = 'ended';
            this.events[YT.PlayerState.PLAYING] = 'playing';
            this.events[YT.PlayerState.PAUSED] = 'paused';
            this.events[YT.PlayerState.BUFFERING] = 'buffering';
            this.events[YT.PlayerState.CUED] = 'cued';
        },
        register(callback: ManagerCallbackFunction): void {
            this.uid++;

            if (this.factory != undefined) {
                callback(this.factory, `vue-youtube-iframe-${this.uid}`);
                return;
            }

            this.players.push(callback);
        },
        runBacklog(): void {
            this.players.forEach((callback) => {
                if (this.factory != undefined) {
                    this.uid++;
                    callback(this.factory, `vue-youtube-iframe-${this.uid}`);
                }

                this.players = [];
            });
        },
    };
}

export const manager = createManager();
