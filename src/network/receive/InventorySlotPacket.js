const Item = require("../../item/Item");
module.exports = {
    name: "inventory_slot",

    /**
     * @param Player {Player}
     * @param packet {Packet}
     */
    receive(Player, packet)
    {
        if(packet.params.window_id !== "inventory")return;
        let item = new Item(packet.params);
        Player.getInventory().setItemBySlot(packet.params.slot, item);
    }
}