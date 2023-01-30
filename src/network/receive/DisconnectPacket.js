const ServerInfo = require("../../ServerInfo");
const Logger = require("../../logger/Logger");
const {getLangConfig} = require("../../ServerInfo");
module.exports = {
    name: "disconnect",

    receive(Player, packet)
    {
        Logger.info(getLangConfig()["player"]["remove-player"].replace("{PLAYER}", Player.getName()));
        ServerInfo.getServer().removePlayer(Player);
    }
}