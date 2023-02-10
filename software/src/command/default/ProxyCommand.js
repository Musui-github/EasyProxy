const Command = require('../Command');
const ServerInfo = require("../../ServerInfo");
class ProxyCommand extends Command
{
    constructor() {
        super("proxy", "Display the list of available commands.");
    }

    onRun(player, args)
    {
        player.sendMessage(`§a--- Displaying the help page ---`);
        let commands = ServerInfo.getServer().getCommandMap().getAll();
        commands.forEach((command) => {
           if(command !== this){
               player.sendMessage(`/${command.getName()} <${command.getUsage()}> §7- §r§o${command.getDescription()}`);
           }
        });
    }
}
module.exports = ProxyCommand;