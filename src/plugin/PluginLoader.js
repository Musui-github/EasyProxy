const fs = require("fs");
const Path = require("path");
const PluginManager = require("./PluginManager");

class PluginLoader
{
    constructor(folder)
    {
        try {
            fs.mkdirSync(folder+"plugin/");
        }catch (e){}
        try {
            fs.mkdirSync(folder+"plugin_data/");
        }catch (e){}

        const eventFiles = fs.readdirSync(folder+'plugin/');
        for (const file of eventFiles) {
            if(file.includes('.'))continue;
            let plugin_json = require('../../resources/plugin/'+file+'/plugin.json');
            let main = require(`../../resources/plugin/${file}/${plugin_json["main"]}.js`);
            let plugin = new main(plugin_json["name"], plugin_json["description"], plugin_json["author"], plugin_json["api"], plugin_json["version"], plugin_json["main"], `${folder}plugin/${file}/`, Path.join(process.cwd() + `/resources/plugin_data/${plugin_json["name"]}/`));
            PluginManager.load(plugin);
        }
    }
}
module.exports = PluginLoader;