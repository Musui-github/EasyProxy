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
class PlayerAuthInputPacket
{
    player;

    /** @param Player {Player} */
    constructor(Player)
    {
        this.player=Player;
    }


    create(position, yaw, pitch, transaction = undefined, block_action = undefined)
    {
        this.player.getBedrockPlayer().upstream.queue("player_auth_input", {
            pitch: pitch,
            yaw: yaw,
            position: position,
            move_vector: {x: 0, z: 0},
            head_yaw: yaw,
            input_data: {
                _value: 0,
                ascend: false,
                descend: false,
                north_jump: false,
                jump_down: false,
                sprint_down: false,
                change_height: false,
                jumping: false,
                auto_jumping_in_water: false,
                sneaking: false,
                sneak_down: false,
                up: false,
                down: false,
                left: false,
                right: false,
                up_left: false,
                up_right: false,
                want_up: false,
                want_down: false,
                want_down_slow: false,
                want_up_slow: false,
                sprinting: false,
                ascend_block: false,
                descend_block: false,
                sneak_toggle_down: false,
                persist_sneak: false,
                start_sprinting: false,
                stop_sprinting: false,
                start_sneaking: false,
                stop_sneaking: false,
                start_swimming: false,
                stop_swimming: false,
                start_jumping: false,
                start_gliding: false,
                stop_gliding: false,
                item_interact: false,
                block_action: false,
                item_stack_request: false
            },
            input_mode: 'mouse',
            play_mode: 'normal',
            interaction_model: 'touch',
            gaze_direction: undefined,
            tick: 1,
            delta: {x: 0, y: -0.07840000092983246, z: 0},
            transaction: undefined,
            item_stack_request: undefined,
            block_action: undefined
        });
    }
}

module.exports = {PlayerAuthInputPacket};