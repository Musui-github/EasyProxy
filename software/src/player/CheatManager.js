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

const UpdateAttributesPacket = require("../packet/UpdateAttributesPacket");
const {Player} = require("./Player");
const AddPlayerPacket = require("../packet/AddPlayerPacket");
const uuid = require("uuid");
const PlayerSkinPacket = require("../packet/PlayerSkinPacket");
const RemoveEntityPacket = require("../packet/RemoveEntityPacket");
const AddEntityPacket = require("../packet/AddEntityPacket");
const Entity = require("../entity/Entity");
const EntityIdsString = require("../entity/EntityIdsString");
const EntityBoundingBox = require("../entity/EntityBoundingBox");
const Position = require("../Position");

class CheatManager
{
    player;

    /**
     * defaults:
     * width: 0.6000000238418579
     * height: 1.7999999523162842
     */
    width_default = 0.6000000238418579;
    height_default = 1.7999999523162842;

    width = 0.6000000238418579;
    height = 1.7999999523162842;

    reach = false;
    reach_value = 3;

    timer = false;
    timer_value = 1.0;
    
    freecam = false;
    freecam_entity;

    AttackPossible = false;
    attackPossible;

    killAura = false;
    killAuraOptions = {reach: 3.0, cps: 1};

    velocity = false;
    velocityX = 0;
    velocityY = 0;
    antiKnockback = false;

    hitbox = false;
    speed_hack = false;
    speed_value = 0.13999999523162842;

    /**
     * Default: 0.05000000074505806
     */
    fly = false;
    fly_speed = 0.05000000074505806;

    autopot = false;
    autosoup = false;
    constructor(Player)
    {
        this.player=Player;
    }

    isHitbox()
    {
        return this.hitbox;
    }

    /** @param value {boolean} */
    setHitbox(value)
    {
        this.hitbox=value;
    }

    isSpeedHack()
    {
        return this.speed_hack;
    }

    /** @param value {boolean} */
    setSpeedHack(value)
    {
        this.speed_hack=value;
        this.player.syncPlayerParams();
    }

    getSpeedHackValue()
    {
        return this.speed_value;
    }

    /** @param value {number} */
    setSpeedHackValue(value)
    {
        this.speed_value=value;
    }

    /**
     * @return {number}
     */
    getWidth()
    {
        return this.width;
    }

    /** @param value {number} */
    setWidth(value)
    {
        this.width = value;
    }

    /**
     * @return {number}
     */
    getHeight()
    {
        return this.height;
    }

    /** @param value {number} */
    setHeight(value)
    {
        this.height = value;
    }

    isReach()
    {
        return this.reach;
    }

    /** @param value {boolean} */
    setReach(value)
    {
        this.reach=value;
    }

    getReachValue()
    {
        return this.reach_value;
    }

    /** @param value {number} */
    setReachValue(value)
    {
        this.reach_value=value;
    }

    getAttackPossible()
    {
        return this.attackPossible;
    }

    setAttackPossible(value)
    {
        this.attackPossible=value;
    }

    hasAttackPossible()
    {
        return this.AttackPossible;
    }

    /** @param value {boolean} */
    setHasAttackPossible(value)
    {
        this.AttackPossible=value;
    }

    /**
     * @return {boolean}
     */
    isTimer()
    {
        return this.timer;
    }

    /**
     * @param str {boolean}
     */
    setTimer(str)
    {
        this.timer=str;
        // this.player.level_event('set_game_speed', {x: 0, y: 0, z: 0}, 0); TODO: (this option is no longer useful)
        this.player.level_event('set_game_speed', {x: this.timer_value, y: 0, z: 0}, 0);
    }

    /**
     * @return {float}
     */
    getTimerValue()
    {
        return this.timer_value;
    }

    /**
     * @param value {float}
     */
    setTimerValue(value)
    {
        this.timer_value=value;
    }

    /**
     * @return {boolean}
     */
    isFreecam()
    {
        return this.freecam;
    }

    setFreecam(value)
    {
        if(value){
            let position = this.player.getPosition();
            let entity = new Entity(new Position({x: position.x, y: position.y - 1.60, z: position.z, pitch: position.pitch, yaw: position.yaw, world: position.world}), EntityIdsString.VILLAGER, null, [this.player]);
            entity.setName(`${this.player.getName()}`);
            entity.setNameTag(this.player.getName());
            entity.setShowNameTag(true);
            entity.spawn();
            this.freecam_entity=entity;

            this.player.setGamemode(this.player.GAMEMODE_SPECTATOR);

        }else {
            this.player.setGamemode(this.player.GAMEMODE_SURVIVAL);
            this.player.move(Math.random(this.player.getPosition().getPos()), Math.random(this.player.getPosition().getPitch()), Math.random(this.player.getPosition().getYaw()), "normal");
            this.freecam_entity.despawn();
        }
        this.freecam=value;
    }

    isKillAura()
    {
        return this.killAura;
    }

    /** @param value {boolean} */
    setKillAura(value)
    {
        this.killAura=value;
    }

    getKillAuraOptions()
    {
        return this.killAuraOptions;
    }

    setKillAuraOptions(options)
    {
        this.killAuraOptions=options;
    }

    isFly()
    {
        return this.fly;
    }

    setFly(value)
    {
        this.fly=value;
        this.player.getAbilities().abilities[0].enabled.flying = value;
        this.player.getAbilities().abilities[0].enabled.may_fly = value;
        this.player.syncPlayerParams();
    }

    getFlySpeed()
    {
        return this.fly_speed;
    }

    setFlySpeed(value)
    {
        this.fly_speed = value;
        this.player.getAbilities().abilities[0].fly_speed = value;
        this.player.syncPlayerParams();
    }

    setAntiKnockback(str)
    {
        this.antiKnockback=str;
    }

    isKnockback()
    {
        return this.antiKnockback;
    }

    setVelocity(str)
    {
        this.velocity=str;
    }

    isVelocity()
    {
        return this.velocity;
    }

    setVelocityX(str)
    {
        this.velocityX=str;
    }

    getVelocityX()
    {
        return this.velocityX;
    }

    setVelocityY(str)
    {
        this.velocityY=str;
    }

    getVelocityY()
    {
        return this.velocityY;
    }

    isAutoPot()
    {
        return this.autopot;
    }

    setAutoPot(str)
    {
        this.autopot = str;
    }

    isAutoSoup()
    {
        return this.autosoup;
    }

    setAutoSoup(str)
    {
        this.autosoup = str;
    }
}
module.exports = CheatManager;