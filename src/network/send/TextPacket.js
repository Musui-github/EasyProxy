const PlayerChatEvent = require("../../event/list/send/PlayerChatEvent");
const EventManager = require("../../event/EventManager");
const PlayerCommandProcessEvent = require("../../event/list/send/PlayerCommandProcessEvent");
module.exports = {
    name: "text",

    /**
     * @param Player {Player}
     * @param packet {Packet}
     */
    send(Player, packet)
    {
        const EventManager = require("../../event/EventManager");
        let events = EventManager.getALl();
        events.forEach((event) => {
            try {
                let listener = new PlayerChatEvent(Player, packet);
                event.onPlayerChat(listener);
                if(listener.isCancelled()){packet = null; return false;}
            }catch (e){}
        });
    }
}