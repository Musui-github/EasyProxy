module.exports = {
    name: "start_game",

    receive(Player, packet)
    {
        Player.setPosition({x: packet.params.player_position.x, y: packet.params.player_position.y, z: packet.params.player_position.z, world: packet.params.world_name, pitch: 0, yaw: 0});
        Player.setGamemode(packet.params.player_gamemode);
        Player.setUniqueID(packet.params.runtime_entity_id);
        //Player.getWorldManager.setDimension(packet.params.dimension);
        //Player.getWorldManager.setSpawnPosition(packet.params.spawn_position);
        //Player.getWorldManager.setGamerule(packet.params.gamerules);
        Player.setGameVersion(packet.params.game_version);
    }
}