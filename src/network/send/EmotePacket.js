const fs = require("fs");
const ServerInfo = require("../../ServerInfo");
const EventManager = require("../../event/EventManager");
const PlayerEmoteEvent = require("../../event/list/send/PlayerEmoteEvent");
module.exports = {
    name: "emote",

    send(Player, packet)
    {
        const EventManager = require("../../event/EventManager");
        let events = EventManager.getALl();
        events.forEach((event) => {
            try {
                let listener = new PlayerEmoteEvent(Player, packet);
                event.onPlayerEmote(listener);
                if(listener.isCancelled()){packet = null; return false;}
            }catch (e){}
        });
    }
}