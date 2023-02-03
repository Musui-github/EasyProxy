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

class AddPlayerPacket
{
    player;

    /** @param Player {Player} */
    constructor(Player)
    {
        this.player=Player;
    }

    /**
     * @param uuid {string}
     * @param username {string}
     * @param runtime_id {number}
     * @param platform_chat_id {string}
     * @param position {Object}
     * @param velocity {Object}
     * @param pitch {number}
     * @param yaw {number}
     * @param head_yaw {number}
     * @param held_item {number}
     * @param gamemode {string}
     * @param metadata {Array}
     * @param properties {Object}
     * @param unique_id {number}
     * @param permission_level {string}
     * @param command_permission {string}
     * @param abilities {Array}
     * @param links {Array}
     * @param device_id {string}
     * @param device_os {string}
     */
    create(uuid, username, runtime_id, platform_chat_id, position, velocity, pitch, yaw, head_yaw, held_item, gamemode, metadata, properties, unique_id, permission_level, command_permission, abilities, links, device_id, device_os)
    {
        this.player.getBedrockPlayer().queue('add_player', {
            uuid: uuid,
            username: username,
            runtime_id: runtime_id,
            platform_chat_id: platform_chat_id,
            position: position,
            velocity: velocity,
            pitch: pitch,
            yaw: yaw,
            head_yaw: head_yaw,
            held_item: held_item,
            gamemode: gamemode,
            metadata: metadata,
            properties: properties,
            unique_id: unique_id,
            permission_level: permission_level,
            command_permission: command_permission,
            abilities: abilities,
            links: links,
            device_id: device_id,
            device_os: device_os
        });
    }
}

module.exports = AddPlayerPacket;