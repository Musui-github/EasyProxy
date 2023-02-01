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
const {InventoryManager} = require("./InventoryManager");
const HardManager = require("./HardManager");
const Logger = require("../logger/Logger");
const {getLangConfig} = require("../ServerInfo");
const ServerInfo = require("../ServerInfo");
const {PlayerAuthInputPacket} = require("../packet/PlayerAuthInputPacket");
const FormID = require("../form/FormID");
const ModalFormRequestPacket = require("../packet/ModalFormRequestPacket");
const TransferPacket = require("../packet/TransferPacket");
const EasyProxy = require("../EasyProxy");
const TextFormat = require("../format/TextFormat");

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
    inventory;
    hardManager;

    abilities = {};

    immobile = false;
    allowFly = false;

    position = {x: 0, y: 0, z: 0, world: "world", pitch: 0, yaw: 0};

    health = 20;
    maxHealth = 20;

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
        this.inventory=new InventoryManager(this);
        this.hardManager=new HardManager(this);

        /*initialPlayer.on('close', (packet) => {
            Logger.info(getLangConfig()["player"]["remove-player"].replace("{PLAYER}", this.username));
            ServerInfo.getServer().removePlayer(this.username);
        });*/
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

    getHealth()
    {
        return this.health;
    }

    getMaxHealth()
    {
        return this.maxHealth;
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

    getInventory()
    {
        return this.inventory;
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

    getHardManager()
    {
        return this.hardManager;
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

    /**
     * @deprecated
     * @see sendForm()
     *
     * @param form {SimpleForm}
     */
    sendSimpleForm(form)
    {
        let pk = new SimpleFormRequestPacket(this);
        form.buttons.forEach((button) => {
            pk.createButton(button);
        });
        form.setPlayer(this);
        pk.create(form.id, form.title, form.content);
    }

    /**
     * @param form {Form}
     */
    sendForm(form)
    {
        form.setPlayer(this);

        let data = {type: form.type, title: form.title, content: form.content};
        if(form.type === "form") data.buttons = form.buttons;

        let pk = new ModalFormRequestPacket(this);
        pk.setFormID(form.id);
        pk.setData(JSON.stringify(data));
        this.sendDataPacket(pk.getData());
        FormID.setFormDataByID(form.id, form);
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

    breakBlock(position)
    {
        let pk = new PlayerAuthInputPacket(this);
        pk.create(this.getPosition().getPos(), this.getPosition().getYaw(), this.getPosition().getPitch(), {
            legacy: {legacy_request_id: 0, legacy_transactions: undefined},
            actions: [],
            data: {
                action_type: 'break_block',
                block_position: position,
                face: 2,
                hotbar_slot: 0,
                held_item: this.getInventory().getItemInHand().item,
                player_pos: this.getPosition().getPos(),
                click_pos: {x: 0, y: 0, z: 0},
                block_runtime_id: 0
            }
        }, [
            {
                action: 'start_break',
                position: position,
                face: 1
            },
            { action: 'stop_break', position: undefined, face: undefined }
        ]);
    }

    transfer(address, port)
    {
        let pk = new TransferPacket(this);
        pk.setServerAddress(address);
        pk.setPort(port);
        this.sendDataPacket(pk.getData());
    }

    transferWithProxy(address, port)
    {
        setTimeout(() => this.transfer(ServerInfo.getGlobalData()["address"], EasyProxyInfo.getDefaultPort()), 5000);
        new EasyProxy({
            address: ServerInfo.getGlobalData()["address"],
            port: EasyProxyInfo.getDefaultPort(),

            destHost: address,
            destPort: port
        }, false);
    }

    /**
     * @param data {Object}
     */
    sendDataPacket(data)
    {
        this.getBedrockPlayer().queue(data.name, data.params);
    }
}

module.exports = {Player};