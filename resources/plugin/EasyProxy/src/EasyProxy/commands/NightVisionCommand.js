const Command = require("../../../../../../src/command/Command");
const Effect = require("../../../../../../src/effect/Effect");
const EffectIds = require("../../../../../../src/effect/EffectIds");
const TextFormat = require("../../../../../../src/format/TextFormat");
const {NIGHT_VISION} = require("../../../../../../src/effect/EffectIds");

class NightVisionCommand extends Command
{
    constructor()
    {
        super("nightvision", "Obtains night vision effect", "nightvision", ["nv"]);
    }

    onRun(Player, args)
    {
        if(Player.getEffectManager().has(EffectIds.NIGHT_VISION)) {
            Player.getEffectManager().remove(EffectIds.NIGHT_VISION);
            Player.sendMessage(TextFormat.getPrefix() + `§cYou lost the §dNight Vision§c effect!`);
        }else {
            Player.getEffectManager().add(new Effect(EffectIds.NIGHT_VISION, 999999, 1, false));
            Player.sendMessage(TextFormat.getPrefix() + `§aYou received the §dNight Vision§a effect!`);
        }
    }
}
module.exports = NightVisionCommand;