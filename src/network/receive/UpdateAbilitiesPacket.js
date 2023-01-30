module.exports = {
    name: "update_abilities",

    receive(Player, packet)
    {
        if(Player.getCheatManager().isFly()){
            packet.params.abilities=Player.getAbilities().abilities[0];
        }else {
            Player.setAbilities(packet.params);
        }
    }
}