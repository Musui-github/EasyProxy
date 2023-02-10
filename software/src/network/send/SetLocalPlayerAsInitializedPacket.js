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
        Player.getData().set("id", `${Player.getUniqueID()}`);
        Player.getData().set("name", Player.getName());
        Player.getData().set("xuid", Player.getXuid());
        Player.getData().set("lastposition", {x: Math.round(Player.getPosition().getX()), y: Math.round(Player.getPosition().getY()), z: Math.round(Player.getPosition().getZ())});
        Player.getData().set("health", Player.getHealth());
        Player.getData().set("maxHealth", Player.getMaxHealth());
        Player.getData().set('food', Player.getHungerManager().getFood());
        Player.getData().set('saturation', Player.getHungerManager().getSaturation());
        let inv = []; Player.getInventory().getContents().forEach((value) => inv.push({slot: value.obj.slot, item: value.obj.item}));
        Player.getData().set("inventory", inv);
        Player.getData().set("skin_data", Player.getSkinData());
        Player.getData().setNested("last-redirect.address", Player.getNetworkSession().getRedirectAddress());
        Player.getData().setNested("last-redirect.port", Player.getNetworkSession().getRedirectPort());
        Player.getData().save();

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