const ServerInfo = require("../../ServerInfo");
module.exports = {
    name: "disconnect",

    receive(Player, packet)
    {
        console.log(`Removed player ${Player.getName()}`);
        ServerInfo.getServer().removePlayer(Player);
    }
}