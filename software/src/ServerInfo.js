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

const ServerData = require('../../server.json');
const LangConfig = require(`./lang/${ServerData["lang"]}.json`);
const {Config} = require("./utils/Config");

let LangConfiguration;

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

    getLangConfiguration()
    {
        if(LangConfiguration === undefined) LangConfiguration = new Config(process.cwd() + `/src/lang/${ServerData["lang"]}.json`);
        return LangConfiguration;
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