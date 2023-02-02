const {ping} = require("bedrock-protocol");
const ServerInfo = require("../ServerInfo");
const EasyProxyInfo = require("../EasyProxyInfo");
const Logger = require("../logger/Logger");

class Query
{
    address;
    port;

    ServerData = new Map();

    constructor(address, port)
    {
        this.address=address;
        this.port=port;
        this.execute();
    }

    async execute()
    {
        await ping({ host: this.address, port: this.port }).then(async res => {
            this.ServerData.set("levelName", res.levelName);
            this.ServerData.set("gamemodeId", res.gamemode);
            this.ServerData.set("serverId", res.serverId);
            this.ServerData.set("portV4", this.port);
            this.ServerData.set("portV6", this.port);
            this.ServerData.set("protocol", res.protocol);
            this.ServerData.set("version", res.version);
            this.ServerData.set("header", res.header);
            this.ServerData.set("motd", res.motd);
            this.ServerData.set("playersOnline", res.playersOnline);
            this.ServerData.set("playersMax", res.playersMax);
        }).catch(err => {
            Logger.warn(`Error with pingRaknet (${this.address}:${this.port}), server is offline...`);
        });
    }

    /**
     * @return {string}
     */
    getLevelName()
    {
        return this.ServerData.get("levelName");
    }

    /**
     * @return {number}
     */
    getGamemodeId()
    {
        return this.ServerData.get("gamemodeId");
    }

    /**
     * @return {string}
     */
    getServerId()
    {
        return this.ServerData.get("serverId");
    }

    /**
     * @return {number}
     */
    getPortV4()
    {
        return this.ServerData.get("portV4");
    }

    /**
     * @return {number}
     */
    getPortV6()
    {
        return this.ServerData.get("portV6");
    }

    /**
     * @return {string}
     */
    getProtocol()
    {
        return this.ServerData.get("protocol");
    }

    /**
     * @return {string}
     */
    getVersion()
    {
        return this.ServerData.get("version");
    }

    /**
     * @return {string}
     */
    getHeader()
    {
        return this.ServerData.get("header");
    }

    /**
     * @return {string}
     */
    getMotd()
    {
        return this.ServerData.get("motd");
    }

    /**
     * @return {number}
     */
    getOnlinesPlayers()
    {
        return this.ServerData.get("playersOnline");
    }

    /**
     * @return {number}
     */
    getMaxOnlinesPlayers()
    {
        return this.ServerData.get("playersMax");
    }
}
module.exports = {
    create(address ,port)
    {
        return new Query(address, port);
    }
}