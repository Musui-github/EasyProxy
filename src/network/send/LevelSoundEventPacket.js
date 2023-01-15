module.exports = {
    name: "level_sound_event",

    /**
     * @param Player {Player}
     * @param packet {Packet}
     */
    send(Player, packet)
    {
        if(packet.params.sound_id === "AttackNoDamage"){
            if(Player.getCheatManager().isReach() && Player.getCheatManager().hasAttackPossible()){
                Player.getCheatManager().setHasAttackPossible(false);
                Player.attack(Player.getCheatManager().getAttackPossible().id);
            }
        }
    }
}