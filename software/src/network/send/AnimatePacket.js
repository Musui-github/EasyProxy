module.exports = {
    name: "animate",

    /**
     * @param Player {Player}
     * @param packet {Packet}
     */
    send(Player, packet)
    {
        if((Player.getCheatManager().isReach() && Player.getCheatManager().hasAttackPossible())){
            Player.getCheatManager().setHasAttackPossible(false);
            Player.attack(Player.getCheatManager().getAttackPossible().id);
        }
    }
}