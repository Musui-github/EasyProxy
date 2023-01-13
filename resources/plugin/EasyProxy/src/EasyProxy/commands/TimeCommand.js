const Command = require("../../../../../../src/command/Command");
const SetTimePacket = require("../../../../../../src/packet/SetTimePacket");
const TextFormat = require("../../../../../../src/format/TextFormat");
class TimeCommand extends Command
{
    constructor() {
        super("time", "Change time", "time <day:night:int>");
    }

    onRun(Player, args)
    {
        let pk = new SetTimePacket(Player);

        if(args[1] === null || args[1] === undefined) return Player.sendMessage(TextFormat.prefix + "You must specify time (Usage: /time <day:night:int>");

        if(args[1] < 0 || args[1] > 24000) return Player.sendMessage(TextFormat.prefix + "The max time is in 0-24000");

        if(args[1].toLowerCase() === "day") {
            pk.create(6000);
            Player.sendMessage(TextFormat.prefix + "Time set to§d day§f!");
        } else if (args[1].toLowerCase() === "night") {
            pk.create(18000);
            Player.sendMessage(TextFormat.prefix + "Time set to§d night§f!");
        } else {
            pk.create(parseInt(args[1]));
            Player.sendMessage(TextFormat.prefix + `Time set to§d ${args[1]}§f!`);
        }
    }
}
module.exports = TimeCommand;