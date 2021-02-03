/// <reference types="youtube" />
export declare type ManagerCallbackFunction = (factory: object, uid: string) => void;
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
export declare function createManager(): Manager;
export declare const manager: Manager;
