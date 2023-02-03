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

const Item = require("../item/Item");

class InventoryManager
{
    player;

    inventory;
    maxhotbarslot = 8;

    itemInHand;

    /** @param Player {Player} */
    constructor(Player)
    {
        this.player = Player;
        this.inventory=new Map();

        for (let i = 0; i < 28; i++){
            this.setVoidItemInSlot(i);
        }
    }

    /**
     * @return {Map}
     */
    getContents()
    {
        return this.inventory;
    }

    /**
     * @return {number}
     */
    getMaxHotBarSlot()
    {
        return this.maxhotbarslot;
    }

    /**
     * @param slot
     * @return {Item}
     */
    getItemBySlot(slot)
    {
        return this.inventory.get(slot);
    }

    /**
     * @param slot {number}
     * @param item {Item}
     */
    setItemBySlot(slot, item)
    {
        this.inventory.set(slot, item);
    }

    setVoidItemInSlot(slot)
    {
        this.inventory.set(slot, new Item({
            window_id: 'inventory',
            slot: slot,
            item: {
                network_id: 0,
                count: 0,
                metadata: 0,
                has_stack_id: 0,
                stack_id: 0,
                block_runtime_id: 0,
                extra: {}
            },
        }));
    }

    getItemInHand()
    {
        return this.itemInHand;
    }

    setItemInHand(item)
    {
        this.itemInHand=item;
    }
}

module.exports = {InventoryManager};