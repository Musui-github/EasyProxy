module.exports = {
    name: "player_skin",

    /**
     * @param Player {Player}
     * @param packet {Packet}
     */
    send(Player, packet)
    {
        Player.setSkinData(packet.params.skin.skin_data);
    }
}