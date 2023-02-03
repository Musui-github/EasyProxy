const ServerInfo = require("../../../../../src/ServerInfo");
const TextFormat = require("../../../../../src/format/TextFormat");
const SimpleForm = require("../../../../../src/form/SimpleForm");

class Events
{
    /*
    Send form when player join
     */
    /**
     * @param event {PlayerJoinEvent}
     */
    onPlayerJoin(event)
    {
        let player = event.getPlayer();
        let form = new SimpleForm(function (player, data) {
            switch (data){
                case 0:
                    player.sendMessage("Boutton 1 clicked");
                    break;
                case 1:
                    player.sendMessage("Boutton 2 clicked");
                    break;
            }
        });
        form.setTitle("Easy Proxy");
        form.setContent("Welcome on Easy Proxy!\nHow are you?");
        form.addButton("I'm great");
        form.addButton("I'm bad");
        player.sendForm(form);
    }
}
module.exports = Events;