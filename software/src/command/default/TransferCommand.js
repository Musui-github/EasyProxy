const Command = require('../Command');
const ServerInfo = require("../../ServerInfo");
const {EasyProxy} = require("../../EasyProxy");
const EasyProxyInfo = require("../../EasyProxyInfo");
const {ping} = require("bedrock-protocol");
const TextFormat = require("../../format/TextFormat");
const TransferPacket = require("../../packet/TransferPacket");
const {Player} = require("../../player/Player");
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

        player.sendMessage(TextFormat.getPrefix() + TextFormat.GREEN + "You will be transferred in 5 seconds...");
        player.transferWithProxy(transferAddress, transferPort);
    }
}
module.exports = ProxyCommand;