const Command = require('../Command');
const ServerInfo = require("../../ServerInfo");
const {EasyProxy} = require("../../EasyProxy");
const EasyProxyInfo = require("../../EasyProxyInfo");
const {ping} = require("bedrock-protocol");
const TextFormat = require("../../format/TextFormat");
const TransferPacket = require("../../packet/TransferPacket");
class ProxyCommand extends Command
{
    constructor() {
        super("transfer", "Transfer to other server!");
    }

    onRun(player, args)
    {
        if(!args[1])return player.sendMessage(TextFormat.prefix + "Please send server address!");

        let transferAddress = args[1].toLowerCase();
        let transferPort = parseInt(args[2]);

        if(!transferPort) transferPort = 19132;

        let pk = new TransferPacket(player);
        pk.setServerAddress(ServerInfo.getGlobalData()["address"]);
        pk.setPort(EasyProxyInfo.getDefaultPort());

        player.sendMessage(TextFormat.getPrefix() + TextFormat.GREEN + "You will be transferred in 5 seconds...");

        let easyProxy=new EasyProxy({
            address: ServerInfo.getGlobalData()["address"],
            port: EasyProxyInfo.getDefaultPort(),
            version: player.getGameVersion(),

            destHost: transferAddress,
            destPort: transferPort
        }, false);

        setTimeout(() => player.sendDataPacket(pk.getData()), 5000);
    }
}
module.exports = ProxyCommand;