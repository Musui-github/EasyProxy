const UpdateAttributesPacket = require("../packet/UpdateAttributesPacket");
const {Player} = require("./Player");
const AddPlayerPacket = require("../packet/AddPlayerPacket");
const uuid = require("uuid");
const PlayerSkinPacket = require("../packet/PlayerSkinPacket");
const RemoveEntityPacket = require("../packet/RemoveEntityPacket");
const AddEntityPacket = require("../packet/AddEntityPacket");

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

    reach = true;
    reach_value = 3;

    timer = false;
    timer_value = 1.0;
    
    freecam = false;

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

    getWidth()
    {
        return this.width;
    }

    /** @param value {number} */
    setWidth(value)
    {
        this.width = value;
    }

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
        this.freecam=value;
        if(this.freecam){
            this.player.setGamemode(this.player.GAMEMODE_SPECTATOR);
            let pk_add_entity = new AddEntityPacket(this.player);
            let position = this.player.getPosition();
            pk_add_entity.create(6666666666, "minecraft:villager", {x: position.getX(), y: position.getY() - 1.75, z: position.getZ()}, {x: 0, y: 0, z: 0}, 0, 0, 0, [], [
                { key: 'flags', type: 'long', value: Math.random({_value: 65536, onfire: false, sneaking: false, riding: false, sprinting: false, action: false, invisible: false, tempted: false, inlove: false, saddled: false, powered: false, ignited: false, baby: false, converting: false, critical: false, can_show_nametag: false, always_show_nametag: false, no_ai: true, silent: false, wallclimbing: false, can_climb: false, swimmer: false, can_fly: false, walker: false, resting: false, sitting: false, angry: false, interested: false, charged: false, tamed: false, orphaned: false, leashed: false, sheared: false, gliding: false, elder: false, moving: false, breathing: false, chested: false, stackable: false, showbase: false, rearing: false, vibrating: false, idling: false, evoker_spell: false, charge_attack: false, wasd_controlled: false, can_power_jump: false, can_dash: false, linger: false, has_collision: false, affected_by_gravity: false, fire_immune: false, dancing: false, enchanted: false, show_trident_rope: false, container_private: false, transforming: false, spin_attack: false, swimming: false, bribed: false, pregnant: false, laying_egg: false, rider_can_pick: false, transition_sitting: false, eating: false, laying_down: false })},
                { key: 'scale', type: 'float', value: 1 },
                { key: 'boundingbox_width', type: 'float', value: this.width_default },
                { key: 'boundingbox_height', type: 'float', value: this.height_default },
                { key: 'nametag', type: 'string', value: this.player.getName() },
                { key: 'variant', type: 'int', value: 10462 },
                { key: 'always_show_nametag', type: 'byte', value: 1 }
            ], { ints: [], floats: [] }, []);

            /*let pk = this.player.getAddEntityPacket();
            pk.params.entity_type="minecraft:villager";
            pk.params.position=this.player.getPosition().getPos();
            pk.params.unique_id=10000;
            pk.params.runtime_id=10000;
            pk.params.metadata.push({ key: 'nametag', type: 'string', value: this.player.getName() });*/
        }else {
            this.player.setGamemode(this.player.GAMEMODE_SURVIVAL);
            this.player.move(Math.random(this.player.getPosition().getPos()), Math.random(this.player.getPosition().getPitch()), Math.random(this.player.getPosition().getYaw()), "teleport");
            let pk = new RemoveEntityPacket(this.player);
            pk.create(6666666666);
        }
    }
}
module.exports = CheatManager;