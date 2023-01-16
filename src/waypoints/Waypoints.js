const AddPlayerPacket = require("../packet/AddPlayerPacket");
const UUIDGenerator = require("uuid");
const PlayerSkinPacket = require("../packet/PlayerSkinPacket");
const AddEntityPacket = require("../packet/AddEntityPacket");
const {Player} = require("../player/Player");
const RemoveEntityPacket = require("../packet/RemoveEntityPacket");
const Console = require("console");
const TextFormat = require("../format/TextFormat");
const Entity = require("../entity/Entity");
const EntityIdsString = require("../entity/EntityIdsString");
const EntityBoundingBox = require("../entity/EntityBoundingBox");
const EntityManager = require("../entity/EntityManager");

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
     * @param nameTag {string}
     */
    add(name, nameTag)
    {
        let position = this.player.getPosition();
        let entity = new Entity(position, EntityIdsString.PLAYER, new EntityBoundingBox(0, 0), [this.player]);
        entity.setName(name);
        entity.setNameTag(nameTag);
        entity.setShowNameTag(true);
        entity.setScale(0.000001);
        entity.spawn();
        this.waypoints.push({name: name, id: entity.getID(), entity: entity});
    }

    /** @param name {string} */
    remove(name)
    {
        this.waypoints.forEach(waypoint => {
            if(waypoint.name === name) {
                EntityManager.unregister(waypoint.entity);
                waypoint.entity.despawn();
            }
        });
    }

    exists(name)
    {
        let includes = false;
        this.waypoints.forEach(waypoint => {
<<<<<<< Updated upstream
            if(waypoint.name === name) {
                includes = true;
            }
=======
>>>>>>> Stashed changes
            if(waypoint.name === name) includes = true;
        });
        return includes;
    }
}

module.exports = Waypoints;