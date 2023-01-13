class NetworkSession {
    player;

    address;
    port;

    /**
     * @param Player {Player}
     * @param address {string}
     * @param port {number}
     */
    constructor(Player, address, port) {
        this.player = Player;
        this.address = address;
        this.port = port;
    }

    /** @returns {string} */
    getRedirectAddress() {
        return this.address;
    }

    /** @returns {string} */
    getRedirectPort() {
        return this.port;
    }
}

module.exports = {NetworkSession};