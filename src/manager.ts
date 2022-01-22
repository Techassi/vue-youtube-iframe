/**
 * RegisterFunc defines a callback function which is used when registering a new player
 */
export type RegisterFunction = (factory: any, uid: string) => void;

/**
 * Manager keeps track of player events and player instances
 */
export class Manager {
  private _players!: Array<RegisterFunction>;
  private _factory!: any;
  private _uid!: number;

  public constructor() {
    this._players = new Array<RegisterFunction>();
    this._uid = 0;
  }

  public registerFactory(factory: any): void {
    this._factory = factory;
  }

  public register(callback: RegisterFunction): void {
    this._uid++;

    if (this._factory !== undefined) {
      callback(this._factory, `vue-youtube-iframe-${this._uid}`);
      return;
    }

    this._players.push(callback);
  }

  public runQueue(): void {
    for (const callback of this._players) {
      if (this._factory !== undefined) {
        this._uid++;
        callback(this._factory, `vue-youtube-iframe-${this._uid}`);
      }

      this._players = [];
    }
  }
}

/**
 * createManager creates and returns the default manager
 */
export function createManager(): Manager {
  return new Manager();
}

const manager = createManager();
export default manager;
