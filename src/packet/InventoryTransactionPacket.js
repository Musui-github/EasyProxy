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

class InventoryTransactionPacket
{
    player;

    /** @param Player {Player} */
    constructor(Player)
    {
        this.player=Player;
    }

    /**
     * @param runtime_entity_id {number}
     */
    createAttackEntity(runtime_entity_id)
    {
        this.player.getBedrockPlayer().upstream.queue('inventory_transaction', {
            transaction: {
                legacy: { legacy_request_id: 0, legacy_transactions: undefined },
                transaction_type: 'item_use_on_entity',
                actions: [],
                transaction_data: {
                    entity_runtime_id: runtime_entity_id,
                    action_type: 'attack',
                    hotbar_slot: this.player.getInventory().getItemInHand().slot,
                    held_item: {network_id: 0},
                    player_pos: this.player.getPosition().getPos(),
                    click_pos: {x: 0, y: 0, z: 0},
                }
            }
        });
    }

    /**
     * @param slot {number}
     */
    clickAir(slot)
    {
        this.player.getBedrockPlayer().upstream.queue('inventory_transaction', {
            transaction: {
                legacy: { legacy_request_id: 0, legacy_transactions: undefined },
                transaction_type: 'item_use',
                actions: [],
                transaction_data: {
                    action_type: 'click_air',
                    block_position: {x: 0, y: 0, z: 0},
                    face: 0,
                    hotbar_slot: slot,
                    held_item: {network_id: 0},
                    player_pos: {x: 0, y: 0, z: 0},
                    click_pos: {x: 0, y: 0, z: 0},
                    block_runtime_id: 0
                }
            }
        });
    }

    changeItemCase(item, slot)
    {
        let voidItem = {
            network_id: 0,
            count: 0,
            metadata: 0,
            has_stack_id: 0,
            stack_id: 0,
            block_runtime_id: 0,
            extra: { has_nbt: 0, nbt: undefined, can_place_on: [], can_destroy: [] }
        }
        this.player.getBedrockPlayer().upstream.queue('inventory_transaction', {
            transaction: {
                legacy: { legacy_request_id: 0, legacy_transactions: undefined },
                transaction_type: 'normal',
                actions: [
                    {
                        source_type: 'container',
                        inventory_id: 'inventory',
                        slot: item.getSlot(),
                        old_item: item.getInitialObject().item,
                        new_item: voidItem
                    },
                    {
                        source_type: 'container',
                        inventory_id: 'inventory',
                        slot: slot,
                        old_item: voidItem,
                        new_item: item.getInitialObject().item
                    }
                ],
            }
        });
    }
}

module.exports = InventoryTransactionPacket;