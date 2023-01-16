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

    AttackPossible = false
    attackPossible;

    hitbox = false;
    speed_hack = false;
    speed_value = 0.13999999523162842;

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
        this.player.syncattributes();
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
        this.player.level_event('set_game_speed', {x: 1.0, y: 0, z: 0}, 0);
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
            this.player.setGamemode(this.player.GAMEMODE_SPECTATOR);

            let position = this.player.getPosition();
            let entity = new Entity({x: position.getX(), y: position.getY() - 1.75, z: position.getZ()}, EntityIdsString.VILLAGER, new EntityBoundingBox(0, 0), [this.player]);
            entity.setName(`${this.player.getName()}`);
            entity.setNameTag(this.player.getName());
            entity.setShowNameTag(true);
            entity.setScale(0.00000001);
            entity.spawn();
            this.freecam_entity=entity;
        }else {
            this.player.setGamemode(this.player.GAMEMODE_SURVIVAL);
            this.player.move(Math.random(this.player.getPosition().getPos()), Math.random(this.player.getPosition().getPitch()), Math.random(this.player.getPosition().getYaw()), "teleport");
        }
        this.freecam=value;
    }
}
module.exports = CheatManager;
