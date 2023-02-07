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
const {getLangConfig, getLangConfiguration} = require("../ServerInfo");
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
        if(ServerInfo.getServer().messages) Logger.info(getLangConfiguration().getNested("plugin.loading").replace("{PLUGIN}", plugin.getName()).replace("{VERSION}", `v${plugin.getVersion()}`));
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

    enablingAll()
    {
        plugins.forEach((plugin)=> {
            plugin.onEnable();
            if(ServerInfo.getServer().messages) Logger.info(getLangConfiguration().getNested("plugin.enabling").replace("{PLUGIN}", plugin.getName()).replace("{VERSION}", `v${plugin.getVersion()}`));
        });
    },

    getAll()
    {
        return plugins;
    }
}