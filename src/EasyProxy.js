/**
 *
 *  ███████╗ █████╗ ███████╗██╗   ██╗██████╗ ██████╗  ██████╗ ██╗  ██╗██╗   ██╗
 *  ██╔════╝██╔══██╗██╔════╝╚██╗ ██╔╝██╔══██╗██╔══██╗██╔═══██╗╚██╗██╔╝╚██╗ ██╔╝
 *  █████╗  ███████║███████╗ ╚████╔╝ ██████╔╝██████╔╝██║   ██║ ╚███╔╝  ╚████╔╝
 *  ██╔══╝  ██╔══██║╚════██║  ╚██╔╝  ██╔═══╝ ██╔══██╗██║   ██║ ██╔██╗   ╚██╔╝
 *  ███████╗██║  ██║███████║   ██║   ██║     ██║  ██║╚██████╔╝██╔╝ ██╗   ██║
 *  ╚══════╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝
 *
 *  Release by EasyProxy's Project!
 *  Github: https://https://github.com/Zwuiix-cmd/EasyProxy
 *
 */

const ServerInfo = require("./ServerInfo");
const {Server} = require("./Server");
class EasyProxy
{
    server;

    constructor(data, messages = true)
    {
        this.server=new Server(data, messages);
        ServerInfo.setServer(this.server);
    }
}

module.exports = {EasyProxy};