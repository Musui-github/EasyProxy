const Command = require('../Command');
const ServerInfo = require("../../ServerInfo");
const PluginManager = require("../../plugin/PluginManager");
const TextFormat = require("../../format/TextFormat");

class PluginHelpCommand extends Command
{
    constructor() {
        super("pluginhelp", "Display the list of available commands.");
    }

    onRun(player, args)
    {
        let pluginList = PluginManager.getAll();
        pluginList.forEach((plugin) => {
            if(args[1].toLowerCase() === plugin.getName().toLowerCase()) {
                player.sendMessage(TextFormat.getPrefix() + `§aHere is the description of the plugin: §f` + plugin.getDescription());
            }
        });
    }
}

module.exports = PluginHelpCommand;