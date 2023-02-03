const Item = require("../../item/Item");
module.exports = {
    name: "inventory_transaction",

    send(Player, packet)
    {
        let data = packet.params.transaction;
        if(data.transaction_type !== "normal")return;
        let itemData = data.actions;
        if(itemData[0].source_type !== "container" || itemData[1].source_type !== "container")return;
        if(itemData[0].inventory_id !== "inventory" || itemData[1].inventory_id !== "inventory")return;

        let oldItem = new Item({
            window_id: 'inventory',
            slot: itemData[0].slot,
            item: itemData[0].new_item
        });
        Player.getInventory().setItemBySlot(itemData[0].slot, oldItem);

        let newItem = new Item({
            window_id: 'inventory',
            slot: itemData[1].slot,
            item: itemData[1].new_item
        });
        Player.getInventory().setItemBySlot(itemData[1].slot, newItem);

        //console.log(packet.params.transaction.actions[0])
    }
}