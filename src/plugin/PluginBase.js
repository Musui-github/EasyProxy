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

const ServerInfo = require("../ServerInfo");
const fs = require("fs");
const Path = require("path");
class PluginBase
{
    name;
    description;
    author;
    api;
    version;
    main;
    pluginFolder;
    dataFolder;

    constructor(name, description, author, api, version, main, pluginFolder, dataFolder)
    {
        this.name=name;
        this.description=description;
        this.author=author;
        this.api=api;
        this.version=version;
        this.main=main;
        this.pluginFolder=pluginFolder;
        this.dataFolder=dataFolder;

        try {fs.mkdirSync(dataFolder);}catch (e){}

        this.onEnable();
    }

    getName()
    {
        return this.name;
    }

    getDescription()
    {
        return this.description;
    }

    getAuthor()
    {
        return this.author;
    }

    getApi()
    {
        return this.api;
    }

    getVersion()
    {
        return this.version;
    }

    getDataFolder()
    {
        return this.dataFolder;
    }

    getDataPlugin()
    {
        return this.pluginFolder;
    }

    server()
    {
        return ServerInfo.getServer();
    }

    onEnable()
    {
        // TODO: Plugin start
    }
}
module.exports = PluginBase;