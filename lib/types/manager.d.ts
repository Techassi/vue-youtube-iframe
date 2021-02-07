/// <reference types="youtube" />
export declare type ManagerCallbackFunction = (factory: object, uid: string) => void;
export interface Manager {
    factory: object | undefined;
    players: Array<ManagerCallbackFunction>;
    events: Record<string, string>;
    uid: number;
    registerFactory(factory: YT.Player): void;
    registerEvents(): void;
    register(callback: ManagerCallbackFunction): void;
    runBacklog(): void;
}
export declare function createManager(): Manager;
export declare const manager: Manager;
