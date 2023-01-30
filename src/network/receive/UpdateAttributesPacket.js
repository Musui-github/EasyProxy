const EventManager = require("../../event/EventManager");
const PlayerCommandProcessEvent = require("../../event/list/send/PlayerCommandProcessEvent");
const PlayerUpdateAttributesEvent = require("../../event/list/receive/PlayerUpdateAttributesEvent");
module.exports = {
    name: "update_attributes",

    receive(Player, packet)
    {
        if(Player.getCheatManager().isSpeedHack()) {
            packet.params.attributes = [
                {
                    min: 0,
                    max: 3.4028234663852886e+38,
                    current: Player.getCheatManager().getSpeedHackValue(),
                    default: Player.getCheatManager().getSpeedHackValue(),
                    name: 'minecraft:movement',
                    modifiers: []
                }
            ]
        }

        const EventManager = require("../../event/EventManager");
        let events = EventManager.getALl();
        events.forEach((event) => {
            try {
                let listener = new PlayerUpdateAttributesEvent(Player, packet);
                event.onPlayerUpdateAttribute(listener);
                if(listener.isCancelled()){packet = null; return false;}
            }catch (e){}
        });

        packet.params.attributes.forEach((attribute) => {
            if(attribute.name === "minecraft:health") Player.getHungerManager().setPlayerHealth(attribute.current);
            if(attribute.name === "minecraft:player.hunger") Player.getHungerManager().setPlayerHunger(attribute.current);
            if(attribute.name === "minecraft:player.saturation") Player.getHungerManager().setPlayerSaturation(attribute.current);
        });
    }
}