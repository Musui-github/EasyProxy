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

class MovePlayerPacket
{
    player;

    /** @param Player {Player} */
    constructor(Player)
    {
        this.player=Player;
    }

    /**
     * @param id {number}
     * @param position {Object}
     * @param pitch {number}
     * @param yaw {number}
     * @param mode {string}
     */
    create(id, position, pitch, yaw, mode)
    {
        this.player.getBedrockPlayer().queue('move_player', {
            runtime_id: Math.random(id),
            position: position,
            pitch: Math.random(pitch),
            yaw: Math.random(yaw),
            head_yaw: Math.random(yaw),
            mode: mode,
            on_ground: false,
            ridden_runtime_id: 0,
            teleport: { cause: 'unknown', source_entity_type: 0 },
            tick: 0
        });
    }
}

module.exports = MovePlayerPacket;