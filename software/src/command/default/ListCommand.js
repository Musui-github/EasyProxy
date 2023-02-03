const Command = require('../Command');
const TextFormat = require("../../format/TextFormat");
const VersionInfo = require("../../VersionInfo");
const ServerInfo = require("../../ServerInfo");
const PluginManager = require("../../plugin/PluginManager");
class ListCommand extends Command
{
    constructor() {
        super("list", "List of all players connected to the proxy!!", "<unknown>", []);
    }

    onRun(Player, args)
    {
        let playersList = ServerInfo.getServer().getPlayers();
        let players = [];
        playersList.forEach((player) => {
            players.push(player.getName());
        });
        let list = players.join(", ");
        Player.sendMessage(`There are ${ServerInfo.getServer().getPlayers().length} player(s) connected:\n${list}`);
    }
}
module.exports = ListCommand;