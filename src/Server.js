const { Relay } = require('bedrock-protocol');
const {Player} = require("./player/Player");

const CommandMap = require('./command/CommandMap');
const fs = require("fs");
const Path = require("path");
const PluginLoader = require("./plugin/PluginLoader");
const {EasyProxy} = require("./EasyProxy");
const EasyProxyInfo = require("./EasyProxyInfo");

class Server
{
    address = "127.0.0.1";
    port = 19132;
    players = [];

    initialRelay;

    constructor(data)
    {
        this.address=data["address"];
        this.port=data["port"];

        EasyProxyInfo.setDefaultPort(this.port+1);

        this.initialRelay=new Relay({
            host: data["address"],
            port: data["port"],
            //version: data["version"],

            motd: data["motd"] + " - " + data["version"],
            levelName: "world",

            playersMax: 99,
            
            destination: {
                host: data["destHost"],
                port: data["destPort"]
            }
        });
        this.initialRelay.listen();

        console.log(`Server has been started successfully on ${data.address}:${data.port}!`);
        console.log(`Destination: ${data["destHost"]}:${data["destPort"]}`);

        this.initialRelay.on('connect', player => {
            player.on('login', (packet) => {
                let user = new Player(player, player.connection.address, player.connection.port);
                user.setName(packet.user.displayName);
                user.setXuid(packet.user.XUID);
                this.addPlayer(user);
                console.log(`Added player ${user.getName()}`);
            });
        });

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
        if(!this.players[player]) this.players.push(player);
    }

    /** @param player {Player} */
    removePlayer(player)
    {
        if(this.players[player]) this.players.pop(player);
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