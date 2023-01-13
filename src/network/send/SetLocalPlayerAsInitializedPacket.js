const EasyProxyInfo = require("../../EasyProxyInfo");
const PlayerJoinEvent = require("../../event/list/send/PlayerJoinEvent");
const EventManager = require("../../event/EventManager");
const PlayerCommandProcessEvent = require("../../event/list/send/PlayerCommandProcessEvent");
module.exports = {
    name: "set_local_player_as_initialized",

    /**
     * @param Player {Player}
     * @param packet {Packet}
     */
    send(Player, packet)
    {
        Player.sendToast('Welcome!', 'Thank you for supporting the §eEasyProxy§r project! §c<3');
        Player.sendMessage("\nWelcome to the §6EasyProxy §r!");
        Player.sendMessage(" §fDiscord: §6" + EasyProxyInfo.Discord);
        Player.sendMessage(" §fAuthors: §6" + EasyProxyInfo.Authors);
        Player.sendMessage("§r");
        Player.sendMessage("§7§oFor help, simply run §e//proxy§7, or for more information you can make a ticket on our discord server!");
        Player.sendMessage("§r");

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