const readline = require('readline');
const ServerInfo = require("../ServerInfo");
const Logger = require("../logger/Logger");
const CommandMap = require("./CommandMap");
const ConsoleSender = require("../ConsoleSender");
const {getLangConfiguration} = require("../ServerInfo");
const PluginManager = require("../plugin/PluginManager");
const TextFormat = require("../format/TextFormat");
const r = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class ConsoleCommand
{
    constructor()
    {
        r.setPrompt('> ');
        r.prompt(true);
        r.on('line', (data) => {
            switch (data.toLowerCase()){
                case "stop":
                    ServerInfo.getServer().shutdown();
                    break;
                case "cls":
                case "clear":
                    console.clear();
                    break;
                case "plugin":
                    let pluginList = PluginManager.getAll();
                    let plugins = [];
                    pluginList.forEach((plugin) => {
                        plugins.push(plugin.getName());
                    });
                    let listA = plugins.join("§f, §d");
                    Logger.info(`Here is the plugin list (${plugins.length}): ${listA}`);
                    break;
                case "list":
                    let playersList = ServerInfo.getServer().getPlayers();
                    let players = [];
                    playersList.forEach((player) => {
                        players.push(player.getName());
                    });
                    let listB = players.join(", ");
                    Logger.info(`There are ${ServerInfo.getServer().getPlayers().length} player(s) connected:\n${listB}`);
                    break;
                default:
                    Logger.warn(getLangConfiguration().getNested("command.unknown-command").replace("{COMMAND}", data[0]));
                    break;
            }
            r.prompt(true);
        });
    }
}
module.exports = ConsoleCommand;