const Item = require("../../item/Item");
module.exports = {
    name: "inventory_content",

    /**
     * @param Player {Player}
     * @param packet {Packet}
     */
    receive(Player, packet)
    {
        if(packet.params.window_id !== "inventory")return;
        for (let i = 0; i < packet.params.input.length; i++){
            let item=packet.params.input[i];
            Player.getInventory().setItemBySlot(i, new Item({
                window_id: 'inventory',
                slot: i,
                item: item,
            }));
        }
    }
}