const ServerInfo = require("./ServerInfo");
const {Server} = require("./Server");
class EasyProxy
{
    server;

    constructor(data)
    {
        this.server=new Server(data);
        ServerInfo.setServer(this.server);
    }
}

module.exports = {EasyProxy};