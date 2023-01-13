const Command = require('../Command');
const ServerInfo = require("../../ServerInfo");
const SimpleForm = require("../../form/SimpleForm");
class FormCommand extends Command
{
    constructor() {
        super("form", "Test");
    }

    onRun(Player, args)
    {
        let form = new SimpleForm(this, 1);
        form.setTitle("EasyProxy");
        form.setContent("Test <3");
        form.addButton("Test1");
        form.addButton("Test2");
        Player.sendSimpleForm(form);
    }
}
module.exports = FormCommand;