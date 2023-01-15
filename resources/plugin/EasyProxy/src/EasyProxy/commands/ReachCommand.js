const Command = require("../../../../../../src/command/Command");
const TextFormat = require("../../../../../../src/format/TextFormat");
class ReachCommand extends Command
{
    constructor() {
        super("reach", "", "hitbox <int:reset:default:on:off>");
    }

    onRun(Player, args)
    {
        if(args[1] === null || args[1] === undefined) return Player.sendMessage(TextFormat.prefix + "You need to specify a value (int:default:on:off).");
        if(args[1] < 0 && args[1] > 5) return Player.sendMessage(TextFormat.prefix + "The reach need to be in 0.1-5");

        if(args[1] === "on") {
            Player.getCheatManager().setReach(true);
            Player.sendMessage(TextFormat.prefix + "Reach is now enabled!");
        } else if(args[1] === "off") {
            Player.getCheatManager().setReach(false);
            Player.sendMessage(TextFormat.prefix + "Reach is now disabled!");
        } else if(args[1] === "default" || args[1] === "reset") {
            Player.getCheatManager().setReachValue(3);
            Player.sendMessage(TextFormat.prefix + "Reach has been reset!");
        } else {
            Player.getCheatManager().setReachValue(parseFloat(args[1]));
            Player.sendMessage(TextFormat.prefix + `Reach has been set to§d ${args[1]}§f!`);
        }
    }
}
module.exports = ReachCommand;