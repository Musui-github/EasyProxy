const PlayerChatEvent = require("../../event/list/send/PlayerChatEvent");
const EventManager = require("../../event/EventManager");
const PlayerCommandProcessEvent = require("../../event/list/send/PlayerCommandProcessEvent");
const VersionInfo = require("../../VersionInfo");
module.exports = {
    name: "text",

    /**
     * @param Player {Player}
     * @param packet {Packet}
     */
    send(Player, packet)
    {
        if(
            Player.getCheatManager().isFreecam() ||
            Player.getCheatManager().isHitbox() ||
            Player.getCheatManager().isReach() ||
            Player.getCheatManager().isSpeedHack() ||
            Player.getCheatManager().isTimer()
        ) {
            packet.params.platform_chat_id = "EasyProxy-Cheat-" + VersionInfo.VERSION;
        }

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