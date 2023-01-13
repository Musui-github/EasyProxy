const Command = require("../../../../../../src/command/Command");
const TextFormat = require("../../../../../../src/format/TextFormat");
class HitboxCommand extends Command
{
    constructor() {
        super("hitbox", "", "hitbox <int:reset:default:on:off>");
    }

    onRun(Player, args)
    {
        if(args[1] === null || args[1] === undefined) return Player.sendMessage(TextFormat.prefix + "You need to specify a value (int:default:on:off).");

        if(args[1] < 0 && args[1] > 5) return Player.sendMessage(TextFormat.prefix + "The hitbox need to be in 0.1-5");

        if(args[1] === "on") {
            Player.getCheatManager().setHitbox(true);
            Player.sendMessage(TextFormat.prefix + "Hitbox is now enabled!");
        } else if(args[1] === "off") {
            Player.getCheatManager().setHitbox(false);
            Player.sendMessage(TextFormat.prefix + "Hitbox is now disabled!");
        } else if(args[1] === "default" || args[1] === "reset") {
            Player.getCheatManager().setWidth(0.6000000238418579);
            Player.getCheatManager().setHeight(1.7999999523162842);
            Player.sendMessage(TextFormat.prefix + "Hitbox has been reset!");
        } else {
            Player.getCheatManager().setWidth(args[1]);
            Player.getCheatManager().setHeight(args[1] * 3);
            Player.sendMessage(TextFormat.prefix + `Hitbox has been set to§d ${args[1]}§f!`);
        }
    }
}
module.exports = HitboxCommand;