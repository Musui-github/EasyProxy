const ServerInfo = require("../../../../../src/ServerInfo");
const TextFormat = require("../../../../../src/format/TextFormat");
const SimpleForm = require("../../../../../src/form/SimpleForm");
const CustomForm = require("../../../../../src/form/CustomForm");

class Events
{
    /**
     * Send form when player join
     * @param event {PlayerJoinEvent}
     */
    onPlayerJoin(event)
    {
        let player = event.getPlayer();
        let form = new CustomForm(function (player, data) {
            if(data.get(0) !== null){
                player.getCheatManager().setReach(data.get(0));
                player.sendMessage(TextFormat.getPrefix() + "§aVous avez défini la §dReach§a sur §d" + (data.get(0) ? "§aActivé" : "§cDésactiver"));
            }
            if(data.get(1) !== null && data.get(2) !== null){
                player.getCheatManager().setReachValue(data.get(1) + data.get(2) / 10);
                player.sendMessage(TextFormat.getPrefix() + "§aVous avez défini la §dReach§a à §d" + (data.get(1) + data.get(2) / 10) + "§a blocs.");
            }
        });
        form.setTitle(TextFormat.getPrefix() + "Reach");
        form.addToggle("§cDésactiver §r=> §aActiver §8| §dReach", player.getCheatManager().isReach());
        form.addSlider("§8=> §dReach §7(3 blocs)", 3, 7);
        form.addSlider("§8=> §dReach §7(0.3 blocs)", 1, 9);
        player.sendForm(form);
    }
}
module.exports = Events;