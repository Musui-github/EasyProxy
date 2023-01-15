const Command = require("../../../../../../src/command/Command");
const Effect = require("../../../../../../src/effect/Effect");
const EffectIds = require("../../../../../../src/effect/EffectIds");
const TextFormat = require("../../../../../../src/format/TextFormat");
const {NIGHT_VISION} = require("../../../../../../src/effect/EffectIds");

class TimerCommand extends Command
{
    constructor()
    {
        super("freecam", "edit freecam", "<unknown>", []);
    }

    onRun(Player, args)
    {
        Player.getCheatManager().setFreecam(!Player.getCheatManager().isFreecam());
        Player.sendMessage(TextFormat.prefix + `§aYou have successfully changed freecam to §d${Player.getCheatManager().isFreecam()}§a!`);
    }
}
module.exports = TimerCommand;