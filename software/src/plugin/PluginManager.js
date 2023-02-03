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

const VersionInfo = require("../VersionInfo");
const Logger = require("../logger/Logger");
const {getLangConfig} = require("../ServerInfo");
const ServerInfo = require("../ServerInfo");
let plugins = [];
module.exports = {
    load(plugin)
    {
        let API = VersionInfo.VERSION.split('.');
        let PLUGIN_API = plugin.getApi().split('.');
        if(API[0] !== PLUGIN_API[0] || API[1] !== PLUGIN_API[1]){
            if(ServerInfo.getServer().messages) Logger.error(getLangConfig()["plugin"]["invalid-api"].replace("{PLUGIN}", plugin.getName()));
            return;
        }
        if(ServerInfo.getServer().messages) Logger.debug(getLangConfig()["plugin"]["load"].replace("{PLUGIN}", plugin.getName()));
        plugins.push(plugin);
    },

    unload(plugin)
    {
        if(plugins[plugin] === undefined)return false;
        delete(plugins[plugin]);
    },

    unloadAll()
    {
        plugins.forEach((plugin) => {
            if(ServerInfo.getServer().messages) Logger.debug(getLangConfig()["plugin"]["unload"].replace("{PLUGIN}", plugin.getName()));
            plugin.onDisable();
            delete(plugin);
        });
    },

    getAll()
    {
        return plugins;
    }
}