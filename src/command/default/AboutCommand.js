const Command = require('../Command');
const TextFormat = require("../../format/TextFormat");
const VersionInfo = require("../../VersionInfo");
class AboutCommand extends Command
{
    constructor() {
        super("about", "Gets the version of this server, including the plugins used!", "<unknown>", ["version", "ver"]);
    }

    onRun(Player, args)
    {
        let SOFTWARE = `This server runs ${TextFormat.GREEN}${VersionInfo.NAME}`;
        if(VersionInfo.IS_DEVELOPMENT_BUILD) SOFTWARE += `${TextFormat.ITALIC}${TextFormat.GRAY}+${TextFormat.DARK_GREEN}dev`;
        Player.sendMessage(SOFTWARE);
        Player.sendMessage(`Server version: ${TextFormat.GREEN}${VersionInfo.VERSION}`);
        Player.sendMessage(`Minecraft Compatible Version: ${TextFormat.GREEN}${Player.getGameVersion()} ${TextFormat.DARK_GREEN}(protocol ${VersionInfo[`PROTOCOL_VERSION_${Player.getGameVersion()}`]})`);
        Player.sendMessage(`NodeJS version: ${TextFormat.GREEN}${process.version}`);
    }
}
module.exports = AboutCommand;