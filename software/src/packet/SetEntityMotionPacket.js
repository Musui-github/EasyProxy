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

class SetEntityMotionPacket
{
    player;
    velocity = {x: 0, y: 0, z: 0};
    runtime_id;

    /** @param Player {Player} */
    constructor(Player)
    {
        this.player=Player;
    }

    /**
     * @param str {string}
     */
    setRuntimeID(str)
    {
        this.runtime_id=str;
    }

    /**
     * @param object {object}
     */
    setVelocity(object)
    {
        this.velocity=object;
    }

    send()
    {
        this.player.getBedrockPlayer().queue('set_entity_motion', {
            runtime_entity_id: this.runtime_id,
            velocity: this.velocity
        });
    }
}

module.exports = SetEntityMotionPacket;
