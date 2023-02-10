const Command = require('../Command');
const ServerInfo = require("../../ServerInfo");
const SimpleForm = require("../../form/SimpleForm");
const {Player} = require("../../player/Player");
class FormCommand extends Command
{
    constructor() {
        super("form", "Test");
    }

    onRun(player, args)
    {
        let form = new SimpleForm(this, 1);
        form.setTitle("EasyProxy");
        form.setContent("Test <3");
        form.addButton("Test1");
        form.addButton("Test2");
        player.sendSimpleForm(form);
    }
}
module.exports = FormCommand;