const AddPlayerPacket = require("../packet/AddPlayerPacket");
const UUIDGenerator = require("uuid");
const PlayerSkinPacket = require("../packet/PlayerSkinPacket");
const AddEntityPacket = require("../packet/AddEntityPacket");
const {Player} = require("../player/Player");
const RemoveEntityPacket = require("../packet/RemoveEntityPacket");
const Console = require("console");
const TextFormat = require("../format/TextFormat");

class Waypoints
{
    waypoints = [];

    player;

    /**
     * @param Player {Player}
     */
    constructor(Player)
    {
        this.player=Player;
    }

    /**
     * @param name {string}
     * @param display_name {string}
     */
    add(name, display_name)
    {
        let position = this.player.getPosition();
        let ID = Math.floor(Math.random() * 9999999);
        let options = {
            name: name,
            id: ID,
            entity_type: "minecraft:warden",
            position: {x: position.getX(), y: position.getY() - 1.75, z: position.getZ()},
            velocity: {x: 0, y: 0, z: 0},
            pitch: 0,
            yaw: 0,
            body_yaw: 0,
            attributes: [],
            metadata: [{key: 'flags', type: 'long', value: Math.random({_value: 65536, onfire: false, sneaking: false, riding: false, sprinting: false, action: false, invisible: false, tempted: false, inlove: false, saddled: false, powered: false, ignited: false, baby: false, converting: false, critical: false, can_show_nametag: false, always_show_nametag: false, no_ai: true, silent: false, wallclimbing: false, can_climb: false, swimmer: false, can_fly: false, walker: false, resting: false, sitting: false, angry: false, interested: false, charged: false, tamed: false, orphaned: false, leashed: false, sheared: false, gliding: false, elder: false, moving: false, breathing: false, chested: false, stackable: false, showbase: false, rearing: false, vibrating: false, idling: false, evoker_spell: false, charge_attack: false, wasd_controlled: false, can_power_jump: false, can_dash: false, linger: false, has_collision: false, affected_by_gravity: false, fire_immune: false, dancing: false, enchanted: false, show_trident_rope: false, container_private: false, transforming: false, spin_attack: false, swimming: false, bribed: false, pregnant: false, laying_egg: false, rider_can_pick: false, transition_sitting: false, eating: false, laying_down: false })},
            {key: 'scale', type: 'float', value: 0},
            {key: 'boundingbox_width', type: 'float', value: 0},
            {key: 'boundingbox_height', type: 'float', value: 0},
            {key: 'nametag', type: 'string', value: display_name},
            {key: 'variant', type: 'int', value: 10462},
            {key: 'always_show_nametag', type: 'byte', value: 1}
        ],
            properties: { ints: [], floats: [] },
            links: []
        };
        this.waypoints.push(options);
        let pk = new AddEntityPacket(this.player);
        pk.create(ID, "minecraft:warden", {x: position.getX(), y: position.getY(), z: position.getZ()}, {x: 0, y: 0, z: 0}, 0, 0, 0, [], [
            { key: 'flags', type: 'long', value: Math.random({_value: 65536, onfire: false, sneaking: false, riding: false, sprinting: false, action: false, invisible: false, tempted: false, inlove: false, saddled: false, powered: false, ignited: false, baby: false, converting: false, critical: false, can_show_nametag: false, always_show_nametag: false, no_ai: true, silent: false, wallclimbing: false, can_climb: false, swimmer: false, can_fly: false, walker: false, resting: false, sitting: false, angry: false, interested: false, charged: false, tamed: false, orphaned: false, leashed: false, sheared: false, gliding: false, elder: false, moving: false, breathing: false, chested: false, stackable: false, showbase: false, rearing: false, vibrating: false, idling: false, evoker_spell: false, charge_attack: false, wasd_controlled: false, can_power_jump: false, can_dash: false, linger: false, has_collision: false, affected_by_gravity: false, fire_immune: false, dancing: false, enchanted: false, show_trident_rope: false, container_private: false, transforming: false, spin_attack: false, swimming: false, bribed: false, pregnant: false, laying_egg: false, rider_can_pick: false, transition_sitting: false, eating: false, laying_down: false })},
            { key: 'scale', type: 'float', value: 0.000000000001 },
            { key: 'boundingbox_width', type: 'float', value: 0.01 },
            { key: 'boundingbox_height', type: 'float', value: 0.01 },
            { key: 'nametag', type: 'string', value: display_name},
            { key: 'variant', type: 'int', value: 10462 },
            { key: 'always_show_nametag', type: 'byte', value: 1 }
        ], { ints: [], floats: [] }, []);
    }

    /** @param name {string} */
    remove(name)
    {
        this.waypoints.forEach(waypoint => {
            if(waypoint.name === name) {
                this.waypoints.pop(waypoint);
                let pk = new RemoveEntityPacket(this.player);
                pk.create(waypoint.id);
            }
        });
    }

    exists(name)
    {
        let includes = false;
        this.waypoints.forEach(waypoint => {
            if(waypoint.name === name) {
                includes = true;
                return;
            }
        });
        return includes;
    }
}

module.exports = Waypoints;