module.exports = {
    name: "set_entity_data",

    /**
     * @param Player {Player}
     * @param packet {Packet}
     */
    receive(Player, packet)
    {
        if(!Player.getCheatManager().isHitbox())return;
        packet.params.metadata.pop({
                key: 'boundingbox_width',
                type: 'float',
                value: 0.6000000238418579
            },
            {
                key: 'boundingbox_height',
                type: 'float',
                value: 1.7999999523162842
            },);
        packet.params.metadata.push({
                key: 'boundingbox_width',
                type: 'float',
                value: Player.getCheatManager().getWidth()
            },
            {
                key: 'boundingbox_height',
                type: 'float',
                value: Player.getCheatManager().getHeight()
            });
    }
}