const Command = require("../../../../../../src/command/Command");
const Effect = require("../../../../../../src/effect/Effect");
const EffectIds = require("../../../../../../src/effect/EffectIds");
const TextFormat = require("../../../../../../src/format/TextFormat");
const {NIGHT_VISION} = require("../../../../../../src/effect/EffectIds");

class TimerCommand extends Command
{
    constructor()
    {
        super("timer", "edit timer", "<float:default:on:off>", []);
    }

    onRun(Player, args)
    {
        if(args[1] === null || args[1] === undefined) return Player.sendMessage(TextFormat.prefix + "You need to specify a value (float:default:on:off).");
        if(args[1] < 0 && args[1] > 5) return Player.sendMessage(TextFormat.prefix + "The timer need to be in 0.1-5");

        if(args[1] === "on") {
            Player.getCheatManager().setTimer(true);
            Player.sendMessage(TextFormat.prefix + "Timer is now enabled!");
        } else if(args[1] === "off") {
            Player.getCheatManager().setTimerValue(1.0);
            Player.getCheatManager().setTimer(false);
            Player.sendMessage(TextFormat.prefix + "Timer is now disabled!");
        } else if(args[1] === "default" || args[1] === "reset") {
            Player.getCheatManager().setTimerValue(1.0);
            Player.sendMessage(TextFormat.prefix + "Timer has been reset!");
        } else {
            Player.getCheatManager().setTimerValue(parseFloat(args[1]));
            Player.sendMessage(TextFormat.prefix + `Timer has been set to§d ${args[1]}§f!`);
        }
    }
}
module.exports = TimerCommand;