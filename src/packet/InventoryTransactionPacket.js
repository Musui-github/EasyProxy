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
                    hotbar_slot: 0,
                    held_item: {network_id: 0},
                    player_pos: this.player.getPosition().getPos(),
                    click_pos: {x: 0, y: 0, z: 0},
                }
            }
        });
    }
}

module.exports = InventoryTransactionPacket;