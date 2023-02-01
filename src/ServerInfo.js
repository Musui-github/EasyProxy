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

const ServerData = require('../server.json');
const LangConfig = require(`./lang/${ServerData["lang"]}.json`);
let ServersData = [];

/**
 * @param server {Server}
 */
let server;
module.exports =
{
    /** @param str {string} */
    setServer(str)
    {
        server=str;
    },

    getServer()
    {
        return server;
    },

    getLangConfig()
    {
        return LangConfig;
    },

    getLang()
    {
        return ServerData["lang"];
    },

    getGlobalData()
    {
        return ServerData;
    },

    setServerDataByID(id ,data)
    {
        ServersData[id]=data;
    },

    getServerDataByID(id)
    {
        return ServersData[id];
    }
}