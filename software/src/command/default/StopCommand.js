const Command = require('../Command');
const ServerInfo = require("../../ServerInfo");
class StopCommand extends Command
{
    constructor() {
        super("stop", "Allows you to stop the scipt you are currently using!.");
    }

    onRun(player, args)
    {
        ServerInfo.getServer().shutdown();
    }
}
module.exports = StopCommand;