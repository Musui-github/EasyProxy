const ServerInfo = require("../../ServerInfo");

let packet = false;
let time;

module.exports = {
    name: "entity_event",

    receive(Player, packet)
    {
        let entity_id = packet.params.runtime_entity_id;
        if(packet.params.event_id === "hurt_animation" && entity_id === Player.getUniqueID()){
            packet = true;
            time = Date.now();
        }else if(packet.params.event_id === "arm_swing" && entity_id !== Player.getUniqueID() && packet){
            packet = false;
            if(Date.now() - time <= 1){
                //Player.attack(entity_id);
            }
            //console.log(Date.now() - time);
        }
    }
}