const Command = require("../../../../../../src/command/Command");
class SpeedCommand extends Command
{
    constructor()
    {
        super("speed", "edit your speed", 'speed <status:value> <on:off>');
    }

    onRun(Player, args)
    {
        // args[0] = "//speed"
        if(isNaN(args[1])) return Player.sendMessage("Arg 1 must be int");
        Player.getCheatManager().setSpeedHackValue(parseFloat(args[1]));
        Player.getCheatManager().setSpeedHack(true);
    }
}
module.exports = SpeedCommand;