const Command = require('../Command');
const ServerInfo = require("../../ServerInfo");
const PluginManager = require("../../plugin/PluginManager");
const TextFormat = require("../../format/TextFormat");
class PluginCommands extends Command
{
    constructor() {
        super("plugin", "Allows you to get a list of currently loaded plugins.", "", ["pl", "plugins"]);
    }

    onRun(Player, args)
    {
        let pluginList = PluginManager.getAll();
        let plugins = [];
        pluginList.forEach((plugin) => {
            plugins.push(plugin.getName());
        });
        let list = plugins.join("§f, §d");
        Player.sendMessage(TextFormat.getPrefix() + `Here is the plugin list: §d${list}`);
    }
}
module.exports = PluginCommands;