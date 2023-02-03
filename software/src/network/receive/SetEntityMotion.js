const {YELLOW} = require("../../format/TextFormat");
module.exports = {
    name: "set_entity_motion",

    /**
     * @param Player {Player}
     * @param packet {Packet}
     */
    receive(Player, packet)
    {
        if(Player.getUniqueID() !== packet.params.runtime_entity_id)return;
        if(Player.getCheatManager().isKnockback()) packet.params.velocity = {x: 0, y: 0, z: 0};
        if(Player.getCheatManager().isVelocity()){
            let x = packet.params.velocity.x;
            let y = packet.params.velocity.y;
            let z = packet.params.velocity.z;
            packet.params.velocity = {x: x / (100 / Player.getCheatManager().getVelocityX()), y: y / (100 / Player.getCheatManager().getVelocityY()), z: z / (100 / Player.getCheatManager().getVelocityX())};
        }
    }
}