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
        let form = new SimpleForm();
        form.setTitle("Easy Proxy");
        form.setContent("Welcome on Easy Proxy!\nHow are you?");
        form.addButton("I'm great");
        form.addButton("I'm bad");
        event.getPlayer().sendSimpleForm(form);
    }
}
module.exports = Events;