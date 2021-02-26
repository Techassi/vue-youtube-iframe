/**
 * RegisterFunc defines a callback function which is used when registering a new player
 */
export type RegisterFunc = (factory: any, uid: string) => void;

/**
 * Manager keeps track of player events and player instances
 */
export class Manager {
    private players!: Array<RegisterFunc>;
    private factory!: any;
    private uid!: number;

    public constructor() {
        this.players = new Array<RegisterFunc>();
        this.uid = 0;
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
