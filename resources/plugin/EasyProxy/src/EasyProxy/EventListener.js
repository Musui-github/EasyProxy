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

    /**
     * @param event {PlayerChatEvent}
     */
    onPlayerChat(event)
    {
        let player = event.getPlayer();
        ServerInfo.getServer().broadcastMessage(TextFormat.prefix + "Test.");
        player.sendMessage("Hello, test!");
    }
}
module.exports = EventListener;