const EventManager = require("../../event/EventManager");
const PlayerCommandProcessEvent = require("../../event/list/send/PlayerCommandProcessEvent");
const PlayerUpdateAttributesEvent = require("../../event/list/receive/PlayerUpdateAttributesEvent");
const ItemID = require("../../item/ItemID");
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
            if(attribute.name === "minecraft:health") {
                Player.health = attribute.current;
                if((Player.getCheatManager().isAutoPot() || Player.getCheatManager().isAutoSoup()) && 14 >= attribute.current) {
                    for (let i = 0; i < 9; i++) {
                        let item = Player.getInventory().getItemBySlot(i);
                        if(Player.getCheatManager().isAutoPot() && item.getID() === 568 && item.getMeta() === 22) {
                            Player.click(i);
                            break;
                        }
                        if(Player.getCheatManager().isAutoSoup() && (item.getID() === ItemID.SLIME_BALL || item.getID() === ItemID.NUMERIC_MUSHROOM_STEW)) {
                            Player.click(i);
                            break;
                        }
                    }
                }
            }
            if(attribute.name === "minecraft:player.hunger") Player.getHungerManager().setFood(attribute.current);
            if(attribute.name === "minecraft:player.saturation") Player.getHungerManager().setSaturation(attribute.current);
        });
    }
}