/**
 *
 *  ███████╗ █████╗ ███████╗██╗   ██╗██████╗ ██████╗  ██████╗ ██╗  ██╗██╗   ██╗
 *  ██╔════╝██╔══██╗██╔════╝╚██╗ ██╔╝██╔══██╗██╔══██╗██╔═══██╗╚██╗██╔╝╚██╗ ██╔╝
 *  █████╗  ███████║███████╗ ╚████╔╝ ██████╔╝██████╔╝██║   ██║ ╚███╔╝  ╚████╔╝
 *  ██╔══╝  ██╔══██║╚════██║  ╚██╔╝  ██╔═══╝ ██╔══██╗██║   ██║ ██╔██╗   ╚██╔╝
 *  ███████╗██║  ██║███████║   ██║   ██║     ██║  ██║╚██████╔╝██╔╝ ██╗   ██║
 *  ╚══════╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝
 *
 *  Release by EasyProxy's Project!
 *  Github: https://https://github.com/Zwuiix-cmd/EasyProxy
 *
 */

const { Relay } = require('bedrock-protocol');
const {Player} = require("./player/Player");

const CommandMap = require('./command/CommandMap');
const fs = require("fs");
const Path = require("path");
const PluginLoader = require("./plugin/PluginLoader");
const {EasyProxy} = require("./EasyProxy");
const EasyProxyInfo = require("./EasyProxyInfo");
const Logger = require("./logger/Logger");
const {getLangConfig} = require("./ServerInfo");
const ServerInfo = require("./ServerInfo");
const {THROWN_TRIDENT} = require("./entity/EntityIdsString");
const { ping } = require('bedrock-protocol');
const Task = require("./task/Task");
const TaskManager = require("./task/TaskManager");
const {sleep} = require("./EasyProxyInfo");

class Server
{
    address = "127.0.0.1";
    port = 19132;
    players = new Map();

    messages;

    initialRelay;

    constructor(data, messages)
    {
        this.messages=messages;
        this.AsyncStart(data).then(r => {});
    }

    async AsyncStart(data)
    {
        this.address=data["address"];
        this.port=data["port"];

        EasyProxyInfo.setDefaultPort(this.port+1);
        EasyProxyInfo.setNextServerID(EasyProxyInfo.getServerID()+1);

        let ServerData = new Map();
        let RelayData = {
            host: data["address"],
            port: data["port"],

            destination: {
                host: data["destHost"],
                port: data["destPort"]
            },
        }

         await ping({ host: data["destHost"], port: data["destPort"] }).then(async res => {
             ServerData.set("motd", res.motd);
             ServerData.set("levelName", res.levelName);
             ServerData.set("playersOnline", res.playersOnline);
             ServerData.set("playersMax", res.playersMax);
             ServerData.set("version", res.version);
             ServerData.set("server", RelayData);

             await ServerInfo.setServerDataByID(EasyProxyInfo.getServerID(), ServerData);
         }).catch(err => {
            Logger.warn("Error with pingRaknet, server is offline...");
            process.exit(-1);
            return false;
        });

        this.initialRelay=new Relay(RelayData);
        this.initialRelay.listen();

        if(!this.messages) console.log();
        Logger.notice(getLangConfig()["server-start"].replace('{SERVER}', `${data["address"]}:${data["port"]}`));
        Logger.notice(getLangConfig()["destination"].replace('{DESTINATION-SERVER}', `${data["destHost"]}:${data["destPort"]}`));

        this.initialRelay.on('connect', player => {
            player.on('login', (packet) => {
                let user = new Player(player, player.connection.address, player.connection.port);
                user.setName(packet.user.displayName);
                user.setXuid(packet.user.XUID);
                this.addPlayer(user);
                Logger.info(getLangConfig()["player"]["add-player"].replace("{PLAYER}", user.getName()));
            });
        });

        let task = new Task(TaskManager.TYPE_REPEAT, 5000, []);

        const commandFiles = fs.readdirSync(Path.join(process.cwd() + '/src/command/default')).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            /** @var Event */
            const cmd = require(`./command/default/${file}`);
            this.getCommandMap().registerDefault(new cmd());
        }

        new PluginLoader(Path.join(process.cwd() + '/resources/'));
    }

    /** @returns {string} <code>Initial Server Address<code> */
    getAddress() {return this.address}
    /** @returns {number} <code>Initial Server Port<code> */
    getPort() {return this.port}

    /** @returns <code>All players connected in proxy<code> */
    getPlayers()  {return this.players}

    /** @param player {Player} */
    addPlayer(player)
    {
        if(!this.players.get(player.getName())) this.players.set(player.getName(), player);
    }

    /** @param player {Player} */
    removePlayer(player)
    {
        if(this.players.get(player.getName())) this.players.delete(player.getName());
    }

    getPlayersByNameExact(name)
    {
        return this.players.get(name)
    }

    broadcastMessage(message)
    {
        this.getPlayers().forEach((player) => {
           player.sendMessage(message);
        });
    }

    getCommandMap()
    {
        return CommandMap.getInstance();
    }
}

module.exports = {Server};