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
const WorldManager = require("./WorldManager");
const InventoryTransactionPacket = require("../packet/InventoryTransactionPacket");
const LevelEventPacket = require("../packet/LevelEventPacket");
const SetPlayerGameTypePacket = require("../packet/SetPlayerGameTypePacket");
const Waypoints = require("../waypoints/Waypoints");
const MovePlayerPacket = require("../packet/MovePlayerPacket");
const EasyProxyInfo = require("../EasyProxyInfo");
const UpdateAbilitiesPacket = require("../packet/UpdateAbilitiesPacket");

class Player
{
    GAMEMODE_CREATIVE = 'creative';
    GAMEMODE_SURVIVAL = 'survival';
    GAMEMODE_SPECTATOR = 'spectator';
    GAMEMODE_ADVENTURE = 'adventure';

    waypoints;

    gameVersion;
    gamemode;

    scoreboard = false;
    scoreboardContent;

    packet;

    player;
    ip;
    port;

    skinData;

    username;
    displayName;
    xuid;
    uuid;
    locale;
    uniqueid;

    networkSession;
    hungerManager;
    effectManager;
    worldManager;
    cheatManager;

    abilities = {};

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
        this.worldManager=new WorldManager(this);
        this.cheatManager=new CheatManager(this);
        this.waypoints=new Waypoints(this);
    }

    getBedrockPlayer() {return this.player;}

    /** @returns {string} */
    getIP() {return this.ip;}

    /** @returns {string} */
    getPort() {return this.port;}

    /**
     * @return {NetworkSession}
     */
    getNetworkSession() {return this.networkSession;}

    /** @returns {string} */
    getName() {return this.username;}

    /**
     * @param value {string}
     */
    setName(value)
    {
        this.username = value;
    }

    /** @returns {string} */
    getXuid() {return this.xuid;}

    /**
     * @param value {string}
     */
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

    /**
     * @return {Position}
     */
    getPosition()
    {
        return this.position;
    }

    /**
     * @param pos {Object}
     */
    setPosition(pos)
    {
        this.position=new Position(pos);
    }

    /**
     * @return {number}
     */
    getUniqueID()
    {
        return this.uniqueid;
    }

    /**
     * @param id {number}
     */
    setUniqueID(id)
    {
        this.uniqueid=id;
    }

    /**
     * @return {HungerManager}
     */
    getHungerManager()
    {
        return this.hungerManager;
    }

    /**
     * @return {EffectManager}
     */
    getEffectManager()
    {
        return this.effectManager;
    }

    /**
     * @return {WorldManager}
     */
    getWorldManager()
    {
        return this.worldManager;
    }

    /**
     * @return {CheatManager}
     */
    getCheatManager()
    {
        return this.cheatManager;
    }

    /**
     * @return {boolean}
     */
    isScoreboard()
    {
        return this.scoreboard;
    }

    /**
     * @param value {boolean}
     */
    setScoreboard(value)
    {
        this.scoreboard=value;
    }

    getScoreboardContent()
    {
        return this.scoreboardContent;
    }

    /** @param value {Scoreboard} */
    setScoreboardContent(value)
    {
        this.scoreboardContent=value;
    }

    getSkinData()
    {
        return this.skinData;
    }

    setSkinData(data)
    {
        this.skinData=data;
    }

    /** @param state {boolean} */
    setImmobile(state)
    {
        this.immobile = state;
    }

    /**
     * @return {boolean}
     */
    isImmobile()
    {
        return this.immobile();
    }

    /**
     * @return {number}
     */
    getGameVersion()
    {
        return this.gameVersion;
    }

    /** @param value {number} */
    setGameVersion(value)
    {
        this.gameVersion = value;
    }

    /**
     * @return {number}
     */
    getGamemode()
    {
        return this.gamemode;
    }

    /** @param gamemode {number} */
    setGamemode(gamemode)
    {
        this.gamemode=gamemode;
        let pk = new SetPlayerGameTypePacket(this);
        pk.create(gamemode);
    }

    /**
     * @param title {string}
     * @param message {string}
     */
    sendToast(title, message)
    {
        let pk = new ToastRequestPacket(this);
        pk.create(title, message);
    }

    /** @param message {string} */
    sendMessage(message)
    {
        let pk = new TextPacket(this);
        pk.create("chat", message);
    }

    /** @param message {string} */
    sendTip(message)
    {
        let pk = new TextPacket(this);
        pk.create("tip", message);
    }

    /** @param message {string} */
    sendPopup(message)
    {
        let pk = new TextPacket(this);
        pk.create("popup", message);
    }

    /**
     * @param title {string}
     * @param fadeIn {number}
     * @param stay {number}
     * @param fadeOut {number}
     */
    sendTitle(title, fadeIn = 0, stay = 0, fadeOut = 0)
    {
        let pk = new SetTitlePacket(this);
        pk.create(title, fadeIn, stay, fadeOut);
    }

    /** @param message {string} */
    chat(message)
    {
        let pk = new TextPacket(this);
        pk.createUpstream(message);
    }

    syncPlayerParams()
    {
        let attributesPacket = new UpdateAttributesPacket(this);
        attributesPacket.create(this.getCheatManager().getSpeedHackValue());

        let updateAbilitiesPacket = new UpdateAbilitiesPacket(this);
        updateAbilitiesPacket.create();
    }

    level_event(event, position, data)
    {
        let pk = new LevelEventPacket(this);
        pk.create(event, position, data);
    }

    /** @param form {Form} */
    sendSimpleForm(form)
    {
        let pk = new SimpleFormRequestPacket(this);
        form.buttons.forEach((button) => {
            pk.createButton(button);
        });
        pk.create(form.id, form.title, form.content);
    }

    /**
     * @param id {number}
     */
    attack(id)
    {
        let pk = new InventoryTransactionPacket(this);
        pk.createAttackEntity(id);
    }

    move(position, pitch, yaw, mode)
    {
        let pk = new MovePlayerPacket(this);
        pk.create(Math.random(this.getUniqueID()), position, pitch, yaw, mode);
    }

    async teleport(position)
    {
        let distance = Math.round(position.distance(this.position));
        // TODO: WAIT
    }

    getWaypoints()
    {
        return this.waypoints;
    }

    getAbilities()
    {
        return this.abilities;
    }

    setAbilities(abilities)
    {
        this.abilities=abilities;
    }
}

module.exports = {Player};