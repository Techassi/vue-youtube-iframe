const manager = {
    factory: null,
    players: [],
    events: {},
    uid: 0,

    // registerFactory registers the YT Factory (e.g. create a new Player)
    registerFactory(YT) {
        this.factory = YT;
    },

    // registerEvents registers the YT Player events to be emitted by the component
    registerEvents() {
        const { PlayerState } = this.factory;
        this.events[PlayerState.ENDED] = 'ended';
        this.events[PlayerState.PLAYING] = 'playing';
        this.events[PlayerState.PAUSED] = 'paused';
        this.events[PlayerState.BUFFERING] = 'buffering';
        this.events[PlayerState.CUED] = 'cued';
    },

    // register registers a new player to be initalizied and runs callback
    register(callback) {
        this.uid += 1;
        if (this.factory) {
            callback(this.factory, `vue-youtube-iframe-${this.uid}`);
            return;
        }
        this.players.push(callback);
    },

    // runBacklog runs backlogged initializations (when the YT factory wasn't set yet)
    runBacklog() {
        this.players.forEach((callback) => {
            callback(this.factory, `vue-youtube-iframe-${this.uid}`);
        });
        this.players = [];
    },
};

export default manager;
