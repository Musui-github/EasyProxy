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
const EasyProxyInfo = require("./EasyProxyInfo");
const Logger = require("./logger/Logger");
const {getLangConfig, getLangConfiguration, getLang} = require("./ServerInfo");
const ServerInfo = require("./ServerInfo");
const { ping } = require('bedrock-protocol');
const {sleep} = require("./EasyProxyInfo");
const PluginManager = require("./plugin/PluginManager");
const {Config} = require("./utils/Config");
const VersionInfo = require("./VersionInfo");
const ResourcePack = require("./pack/types/ResourcePack");
const PackManager = require("./pack/PackManager");
const ResourcePackSendData = require('./pack/task/ResourcePackSendData');

/*** @var {Config}*/
let EasyProxyConfig;

class Server
{
    address = "127.0.0.1";
    port = 19132;
    players = new Map();

    messages;

    initialRelay;

    lang;

    constructor(data, messages)
    {
        this.messages=messages;
        this.AsyncStart(data).then(r => {});
    }

    async AsyncStart(data)
    {
        let started_time = Date.now();

        await sleep(500);

        await console.clear();
        if(this.messages) await Logger.info(getLangConfiguration().getNested("server.loading"));

        let mkDir_FILES = ["plugin", "plugin_data", "resource_packs", "players"];
        mkDir_FILES.forEach((file) => {
            if (!fs.existsSync(Path.join(process.argv[2] + '/' + file))) fs.mkdirSync(Path.join(process.argv[2] + '/' + file));
        });

        if(this.messages) await Logger.info(getLangConfiguration().getNested("pack.load"));
        let packsTotal = 0;
        const packs = fs.readdirSync(Path.join(process.argv[2] + '/resource_packs')).filter(file => file.endsWith('.zip'));
        for (const packFile of packs) {
            let pack = new ResourcePack(Path.join(process.argv[2] + '/resource_packs/' + packFile));
            await sleep(500);
            packsTotal++;
            if(this.messages) await Logger.info(getLangConfiguration().getNested("pack.loading").replace('{PACK}', pack.getPackName).replace('{SIZE}', pack.getPackSize));
            PackManager.register(pack);
        }
        if(this.messages && packsTotal !== 0) await Logger.info(getLangConfiguration().getNested("pack.loaded").replace('{COUNT}', packsTotal));

        this.address=data["address"];
        this.port=data["port"];

        EasyProxyInfo.setDefaultPort(this.port+1);
        EasyProxyInfo.setNextServerID(EasyProxyInfo.getServerID()+1);

        let ServerData = new Map();
        let RelayData = {
            host: data["address"],
            port: data["port"],

            profilesFolder: Path.join(process.argv[2] + '/players'),

            destination: {
                host: data["destHost"],
                port: data["destPort"]
            },
        }

        if(this.messages) await Logger.info(getLangConfiguration().getNested("server.lang").replace('{LANG}', getLang()));

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

        if(this.messages){
            await Logger.info(getLangConfiguration().getNested("server.starting").replace('{VERSION}', ServerData.get("version")));
            await Logger.info(getLangConfiguration().getNested("server.running").replace('{VERSION}', VersionInfo.VERSION).replace('{NAME}', VersionInfo.NAME));
        }

        this.initialRelay=new Relay(RelayData);
        this.initialRelay.listen();

        if(this.messages) {
            await Logger.info(getLangConfig()["server-start"].replace('{SERVER}', `${data["address"]}:${data["port"]}`));
            await Logger.info(getLangConfig()["destination"].replace('{DESTINATION-SERVER}', `${data["destHost"]}:${data["destPort"]}`));

            let resourcePackSendData = new ResourcePackSendData();
        }

        this.initialRelay.on('connect', player => {
            player.on('login', (packet) => {
                let user = new Player(player, player.connection.address, player.connection.port);
                user.setName(packet.user.displayName);
                user.setXuid(packet.user.XUID);
                this.addPlayer(user);
                Logger.info(getLangConfig()["player"]["add-player"].replace("{PLAYER}", user.getName()));
            });
        });

        this.setLang(data["lang"]);
        EasyProxyConfig = new Config(Path.join(process.argv[2] + "/easyproxy.json"));
        if(!EasyProxyConfig.getNested("settings.enable-dev-builds", false) && VersionInfo.IS_DEVELOPMENT_BUILD){
            await Logger.warn(getLangConfiguration().getNested("server.can-start.development-build"));
            this.shutdown();
            return;
        }

        await new PluginLoader(Path.join(process.argv[2] + '/plugin/'));

        const commandFiles = fs.readdirSync(Path.join(process.cwd() + '/src/command/default')).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            /** @var Event */
            const cmd = require(`./command/default/${file}`);
            this.getCommandMap().registerDefault(new cmd());
        }

        PluginManager.enablingAll();
        await Logger.info(getLangConfiguration().getNested("server.started").replace('{SEC}', `0.${(Date.now() - started_time)}`));
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

    getLang()
    {
        return this.lang;
    }

    setLang(str)
    {
        this.lang=str;
    }

    shutdown()
    {
        let reason = getLangConfiguration().getNested("")
        this.getPlayers().forEach((player) => {
           player.kick(EasyProxyConfig.getNested("settings.shutdown-message"));
        });
        Logger.info(getLangConfiguration().getNested("server.shutdown"));
        PluginManager.unloadAll();
        process.exit(-1);
    }

    getCommandMap()
    {
        return CommandMap.getInstance();
    }
}

module.exports = {Server};