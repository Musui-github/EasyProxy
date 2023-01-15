module.exports = {
    name: "player_auth_input",

    /**
     * @param Player {Player}
     * @param packet {Packet}
     */
    send(Player, packet)
    {
        let position = packet.params.position;
        Player.setPosition({x: position.x, y: position.y, z: position.z, pitch: packet.params.pitch, yaw: packet.params.yaw});
    }
}