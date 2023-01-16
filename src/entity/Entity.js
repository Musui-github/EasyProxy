const EntityBoundingBox = require("./EntityBoundingBox");
const TextFormat = require("../format/TextFormat");
const AddEntityPacket = require("../packet/AddEntityPacket");
const EntityManager = require("./EntityManager");
const RemoveEntityPacket = require("../packet/RemoveEntityPacket");

class Entity
{
    id;

    name = "Unknown";
    scale = 1;

    nameTag;
    showNameTag = false;
    idString;

    position;
    pitch;
    yaw;
    body_yaw;

    metadata;

    /**
     * defaults:
     * width: 0.6000000238418579
     * height: 1.7999999523162842
     */
    width_default = 0.6000000238418579;
    height_default = 1.7999999523162842;
    boundingbox;

    players = [];

    /**
     * @param position {Position}
     * @param idString {string}
     * @param boundingbox {EntityBoundingBox}
     * @param players {Player[]}
     */
    constructor(position, idString, boundingbox, players)
    {
        this.id=EntityManager.getNextID();

        this.position=position;
        this.idString=idString;
        this.boundingbox=boundingbox;
        this.players=players;

        if(!TextFormat.isset(boundingbox)) this.boundingbox=new EntityBoundingBox(this.height_default, this.width_default);
    }

    /**
     * @return {EntityBoundingBox}
     */
    getBoundingBox()
    {
        return this.boundingbox;
    }

    /**
     * @param height {float}
     * @param width {float}
     */
    setBoundingBox(height, width)
    {
        this.boundingbox.height=height;
        this.boundingbox.width=width;
    }

    /**
     * @return {number}
     */
    getID()
    {
        return this.id;
    }

    /**
     * Return name of entity
     * @returns {string}
     */
    getName()
    {
        return this.name;
    }

    /**
     * Define a new name of entity
     * @param {string} value
     */
    setName(value)
    {
        this.name=value;
    }

    /**
     * Return name of entity
     * @returns {string}
     */
    getNameTag()
    {
        return this.nameTag;
    }

    /**
     * Define a new name of entity
     * @param {string} value
     */
    setNameTag(value)
    {
        this.nameTag=value;
    }

    /**
     * Return a scale of entity
     * @returns {float}
     */
    getScale()
    {
        return this.scale;
    }

    /**
     * Define a new scale of entity
     * @param {float} value 
     */
    setScale(value)
    {
        this.scale=value;
    }

    /**
     * 
     * @returns {boolean}
     */
    getShowNameTag()
    {
        return this.showNameTag;
    }

    /**
     * 
     * @param {boolean} value 
     */
    setShowNameTag(value)
    {
        this.showNameTag=value;
    }

    syncProperties()
    {
        let always_show_nametag = 0;
        if(this.showNameTag) always_show_nametag = 1;
        this.metadata=[
            {key: 'flags', type: 'long', value: Math.random({_value: 65536, onfire: false, sneaking: false, riding: false, sprinting: false, action: false, invisible: false, tempted: false, inlove: false, saddled: false, powered: false, ignited: false, baby: false, converting: false, critical: false, can_show_nametag: false, always_show_nametag: false, no_ai: true, silent: false, wallclimbing: false, can_climb: false, swimmer: false, can_fly: false, walker: false, resting: false, sitting: false, angry: false, interested: false, charged: false, tamed: false, orphaned: false, leashed: false, sheared: false, gliding: false, elder: false, moving: false, breathing: false, chested: false, stackable: false, showbase: false, rearing: false, vibrating: false, idling: false, evoker_spell: false, charge_attack: false, wasd_controlled: false, can_power_jump: false, can_dash: false, linger: false, has_collision: false, affected_by_gravity: false, fire_immune: false, dancing: false, enchanted: false, show_trident_rope: false, container_private: false, transforming: false, spin_attack: false, swimming: false, bribed: false, pregnant: false, laying_egg: false, rider_can_pick: false, transition_sitting: false, eating: false, laying_down: false })},
            {key: 'scale', type: 'float', value: this.scale},
            {key: 'boundingbox_width', type: 'float', value: this.boundingbox.getWidth()},
            {key: 'boundingbox_height', type: 'float', value: this.boundingbox.getHeight()},
            {key: 'nametag', type: 'string', value: this.nameTag},
            {key: 'variant', type: 'int', value: 10462},
            {key: 'always_show_nametag', type: 'byte', value: always_show_nametag}
        ];
    }

    /**
     * @param position {Position}
     */
    spawnTo(position)
    {
        this.position=position;
        this.spawn();
    }

    spawn()
    {
        this.syncProperties();
        this.players.forEach(player => {
            let pk = new AddEntityPacket(player);
            pk.create(this.id,
                this.idString,
                this.position.getPos(),
                {x: 0, y: 0, z: 0},
                this.pitch,
                this.yaw,
                this.body_yaw,
                [],
                this.metadata,
                { ints: [], floats: [] },
                []);
        });

        EntityManager.register(this);
    }

    despawn()
    {
        this.players.forEach(player => {
            let pk = new RemoveEntityPacket(player);
            pk.create(this.getID());
        });
    }
}
module.exports = Entity;
