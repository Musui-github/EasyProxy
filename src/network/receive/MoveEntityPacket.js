module.exports = {
    name: "move_entity",

    /**
     * @param Player {Player}
     * @param packet {Packet}
     */
    receive(Player, packet)
    {
        let position = packet.params.position;
        if(packet.params.runtime_entity_id === Player.getUniqueID())return;

        if(Player.getCheatManager().isReach() && Player.getPosition().distance(position) <= Player.getCheatManager().getReachValue())
        {
            let directionVector = Player.getPosition().getDirectionVector();
            for(let i = 0.0; i <= Player.getCheatManager().getReachValue(); i++){
                let x = directionVector.x * i + Player.getPosition().getX();
                let y = directionVector.y * i + Player.getPosition().getY();
                let z = directionVector.z * i + Player.getPosition().getZ();
                if(
                    Math.round(x) === Math.round(position.x) &&
                    Math.round(y) === Math.round(position.y) &&
                    Math.round(z) === Math.round(position.z)
                ) {
                    Player.getCheatManager().setHasAttackPossible(true);
                    Player.getCheatManager().setAttackPossible({id: packet.params.runtime_entity_id, reach: i, position: position});
                }
            }
        }

        if(Player.getCheatManager().isMisplace() && Player.getPosition().distance(position) <= Player.getCheatManager().getMisplaceValue())
        {
            let directionVector = Player.getPosition().getDirectionVector();
            for(let i = 0.0; i <= Player.getCheatManager().getMisplaceValue(); i++){
                let x = directionVector.x * i + Player.getPosition().getX();
                let y = directionVector.y * i + Player.getPosition().getY();
                let z = directionVector.z * i + Player.getPosition().getZ();
                if(
                    Math.round(x) === Math.round(position.x) &&
                    Math.round(y) === Math.round(position.y) &&
                    Math.round(z) === Math.round(position.z)
                ) {
                    Player.getCheatManager().setHasAttackPossible(true);
                    Player.getCheatManager().setAttackPossible({id: packet.params.runtime_entity_id, reach: i, position: position});
                }
            }
        }

        if(Player.getCheatManager().isKillAura() && Player.getPosition().distance(position) <= Player.getCheatManager().getKillAuraOptions().reach) {
            for (let i = 0; i <= Player.getCheatManager().getKillAuraOptions().cps; i++){
                Player.attack(packet.params.runtime_entity_id);
            }
        }
    }
}