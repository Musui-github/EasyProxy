const EasyProxyInfo = require("../../EasyProxyInfo");
const PlayerJoinEvent = require("../../event/list/send/PlayerJoinEvent");
const EventManager = require("../../event/EventManager");
const PlayerCommandProcessEvent = require("../../event/list/send/PlayerCommandProcessEvent");
const VersionInfo = require("../../VersionInfo");
const TextFormat = require("../../format/TextFormat");
module.exports = {
    name: "set_local_player_as_initialized",

    /**
     * @param Player {Player}
     * @param packet {Packet}
     */
    send(Player, packet)
    {
        Player.sendMessage(TextFormat.STRIKETHROUGH);
        Player.sendMessage(TextFormat.ITALIC + TextFormat.GRAY + `This proxy is currently running the ${VersionInfo.VERSION} version of ${VersionInfo.NAME}!`);
        Player.sendMessage(TextFormat.STRIKETHROUGH);

        const EventManager = require("../../event/EventManager");
        let events = EventManager.getALl();
        events.forEach((event) => {
            try {
                let listener = new PlayerJoinEvent(Player, packet);
                event.onPlayerJoin(listener);
                if(listener.isCancelled()){packet = null; return false;}
            }catch (e){}
        });
    }
}