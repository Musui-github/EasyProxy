const ServerInfo = require("../../../../../src/ServerInfo");
const TextFormat = require("../../../../../src/format/TextFormat");

class EventListener
{
    constructor()
    {
    }

    /**
     * @param event {PlayerEmoteEvent}
     */
    onPlayerEmote(event)
    {
        event.getPlayer().sendMessage(`Tu as essayé de faire une emote avec pour id §d${event.getEmoteId()}`);
        event.cancel();
    }
}
module.exports = EventListener;