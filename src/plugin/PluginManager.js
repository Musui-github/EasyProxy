const VersionInfo = require("../VersionInfo");
let plugins = [];
module.exports = {
    load(plugin)
    {
        let API = VersionInfo.VERSION.split('.');
        let PLUGIN_API = plugin.getApi().split('.');
        if(API[0] !== PLUGIN_API[0]){
            console.error(`Plugin ${plugin.getName()} does not have the right API!`);
            return;
        }
        console.log(`Plugin ${plugin.getName()} has been loaded successfully!`);
        plugins.push(plugin);
    },

    getAll()
    {
        return plugins;
    }
}