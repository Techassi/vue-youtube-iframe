export declare type ManagerCallbackFunction = (factory: any, uid: string) => void;
export interface Manager {
    factory: any | undefined;
    players: Array<ManagerCallbackFunction>;
    events: Record<string, string>;
    uid: number;
    registerFactory(factory: any): void;
    registerEvents(): void;
    register(callback: ManagerCallbackFunction): void;
    runBacklog(): void;
}
export declare function createManager(): Manager;
export declare const manager: Manager;
