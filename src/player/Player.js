const {NetworkSession} = require("../NetworkSession");
const {HungerManager} = require("./HungerManager");
const Packet = require("../network/Packet");
const Position = require("../Position");
const Scoreboard = require("../scoreboard/Scoreboard");
const EffectManager = require("./EffectManager");
const Effect = require("../effect/Effect");
const EffectIds = require("../effect/EffectIds");
const UpdateAttributesPacket = require("../packet/UpdateAttributesPacket");
const ToastRequestPacket = require("../packet/ToastRequestPacket");
const TextPacket = require("../packet/TextPacket");
const CheatManager = require("./CheatManager");
const SetTitlePacket = require("../packet/SetTitlePacket");
const SimpleFormRequestPacket = require("../packet/SimpleFormRequestPacket");

class Player
{
    dimension;
    spawnPosition;
    gameVersion;
    gamemode;
    gamerule;

    scoreboard = false;
    scoreboardContent;

    packet;

    player;
    ip;
    port;

    username;
    displayName;
    xuid;
    uuid;
    locale;
    uniqueid;

    networkSession;
    hungerManager;
    effectManager;
    cheatManager;

    immobile = false;
    allowFly = false;

    position = {x: 0, y: 0, z: 0, world: "world", pitch: 0, yaw: 0};

    /**
     * @param initialPlayer
     * @param address {string}
     * @param port {number}
     */
    constructor(initialPlayer, address, port)
    {
        this.player=initialPlayer;
        this.xuid=initialPlayer.xuid;
        this.username=initialPlayer.username;

        this.packet = new Packet(this);
        this.networkSession=new NetworkSession(this, address, port);
        this.hungerManager=new HungerManager(this);
        this.effectManager=new EffectManager(this);
        this.cheatManager=new CheatManager(this);
    }

    getBedrockPlayer() {return this.player;}

    /** @returns {string} */
    getIP() {return this.ip;}

    /** @returns {string} */
    getPort() {return this.port;}

    getNetworkSession() {return this.networkSession;}

    /** @returns {string} */
    getName() {return this.username;}
    setName(value)
    {
        this.username = value;
    }

    /** @returns {string} */
    getXuid() {return this.xuid;}

    setXuid(value)
    {
        this.xuid = value;
    }

    /** @returns {string} */
    getUuid() {return this.uuid;}

    /** @returns {string} */
    getLocale() {return this.locale;}

    /** @param str {boolean}*/
    setAllowFly(str)
    {
        this.allowFly=str;
        //TODO: SEND PACKET FOR ACTIVE/DEACTIVATE FLY
    }

    /** @returns {boolean} */
    isAllowFly() {return this.allowFly;}

    getPosition()
    {
        return this.position;
    }

    setPosition(pos)
    {
        this.position=new Position(pos);
    }

    getUniqueID()
    {
        return this.uniqueid;
    }

    setUniqueID(id)
    {
        this.uniqueid=id;
    }

    getHungerManager()
    {
        return this.hungerManager;
    }

    getEffectManager()
    {
        return this.effectManager;
    }

    getCheatManager()
    {
        return this.cheatManager;
    }

    isScoreboard()
    {
        return this.scoreboard;
    }

    setScoreboard(value)
    {
        this.scoreboard=value;
    }

    getScoreboardContent()
    {
        return this.scoreboardContent;
    }

    setScoreboardContent(value)
    {
        this.scoreboardContent=value;
    }

    /** @param state {boolean}*/
    setImmobile(state)
    {
        this.immobile = state;
    }

    isImmobile()
    {
        return this.immobile();
    }

    getDimension()
    {
        return this.dimension;
    }

    setDimension(value)
    {
        this.dimension = value;
    }

    getSpawnPosition()
    {
        return this.spawnPosition;
    }

    setSpawnPosition(value)
    {
        this.spawnPosition = value;
    }

    getGameVersion()
    {
        return this.gameVersion;
    }

    setGameVersion(value)
    {
        this.gameVersion = value;
    }

    getGamemode()
    {
        return this.gamemode;
    }

    setGamemode(gm)
    {
        this.gamemode=gm;
    }

    getGamerule()
    {
        return this.gamerule;
    }

    setGamerule(value)
    {
        this.gamerule = value;
    }

    sendToast(title, message)
    {
        let pk = new ToastRequestPacket(this);
        pk.create(title, message);
    }

    sendMessage(message)
    {
        let pk = new TextPacket(this);
        pk.create("chat", message);
    }

    sendTip(message)
    {
        let pk = new TextPacket(this);
        pk.create("tip", message);
    }

    sendPopup(message)
    {
        let pk = new TextPacket(this);
        pk.create("popup", message);
    }

    sendTitle(title, fadeIn = 0, stay = 0, fadeOut = 0)
    {
        let pk = new SetTitlePacket(this);
        pk.create(title, fadeIn, stay, fadeOut);
    }

    syncattributes()
    {
        let pk = new UpdateAttributesPacket(this);
        pk.create(this.getCheatManager().getSpeedHackValue());
    }

    /**
     * @param form {Form}
     */
    sendSimpleForm(form)
    {
        let pk = new SimpleFormRequestPacket(this);
        form.buttons.forEach((button) => {
            pk.createButton(button);
        });
        pk.create(form.id, form.title, form.content);
    }
}

module.exports = {Player};