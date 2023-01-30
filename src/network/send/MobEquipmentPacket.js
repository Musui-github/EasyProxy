const Item = require("../../item/Item");
module.exports = {
    name: "mob_equipment",

    /**
     * @param Player {Player}
     * @param packet {Packet}
     */
    send(Player, packet)
    {
        if(Player.getUniqueID() !== packet.params.runtime_entity_id)return;
        if(packet.params.window_id !== "inventory")return;
        if(packet.params.slot !== packet.params.selected_slot)return;
        Player.getInventory().setItemInHand(new Item(packet.params));
    }
}