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

const {Player} = require("../player/Player");

class AddEntityPacket
{
    player;

    /** @param Player {Player} */
    constructor(Player)
    {
        this.player=Player;
    }

    /**
     * @param id {number}
     * @param entity_type {string}
     * @param position {Position}
     * @param velocity {Object}
     * @param pitch {number}
     * @param yaw {number}
     * @param body_yaw {number}
     * @param attributes {Array}
     * @param metadata {Array}
     * @param properties {Object}
     * @param links {Array}
     */
    create(id, entity_type, position, velocity, pitch, yaw, body_yaw, attributes, metadata, properties, links)
    {
        this.player.getBedrockPlayer().queue('add_entity', {
            unique_id: id,
            runtime_id: id,
            entity_type: entity_type,
            position: position,
            velocity: velocity,
            pitch: pitch,
            yaw: yaw,
            head_yaw: yaw,
            body_yaw: body_yaw,
            attributes: attributes,
            metadata: metadata,
            properties: properties,
            links: links
        });
    }
}

module.exports = AddEntityPacket;