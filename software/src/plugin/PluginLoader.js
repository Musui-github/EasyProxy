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

const fs = require("fs");
const Path = require("path");
const PluginManager = require("./PluginManager");

class PluginLoader
{
    constructor(folder)
    {
        const eventFiles = fs.readdirSync(folder);
        for (const file of eventFiles) {
            if(file.includes('.'))continue;
            let plugin_json = require('../../../plugin/'+file+'/plugin.json');
            let main = require(`../../../plugin/${file}/${plugin_json["main"]}.js`);
            let plugin = new main(plugin_json["name"], plugin_json["description"], plugin_json["author"], plugin_json["api"], plugin_json["version"], plugin_json["main"], `${folder}plugin/${file}/`, Path.join(process.cwd() + `/plugin_data/${plugin_json["name"]}/`));
            PluginManager.load(plugin);
        }
    }
}
module.exports = PluginLoader;