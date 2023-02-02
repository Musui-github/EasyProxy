const Path = require("path");
const Logger = require("../logger/Logger");
const {getLangConfig} = require("../ServerInfo");
const ServerInfo = require("../ServerInfo");
let commands = [];
class CommandMap
{
    registerDefault(command)
    {
        if(ServerInfo.getServer().messages) Logger.debug(getLangConfig()["command"]["registered-success"].replace("{COMMAND}", command.getName()));
        commands.push(command);
    }

    /**
     * @deprecated
     * @see registerCommand()
     *
     * @param folder
     */
    register(folder)
    {
        let req = require(Path.join(folder));
        let command = new req();
        if(this.existCommand(command))return false;
        if(ServerInfo.getServer().messages) Logger.debug(getLangConfig()["command"]["registered-success"].replace("{COMMAND}", command.getName()));
        commands.push(command);
    }

    /**
     *
     * @param command {Command}
     */
    registerCommand(command)
    {
        if(this.existCommand(command))return false;
        if(ServerInfo.getServer().messages) Logger.debug(getLangConfig()["command"]["registered-success"].replace("{COMMAND}", command.getName()));
        commands.push(command);
    }

    unregisterCommand(command)
    {
        if(!this.existCommand(command))return false;
        delete (commands[command]);
    }

    existCommand(command)
    {
        return commands[command] !== undefined;
    }

    getAll()
    {
        return commands;
    }
}
module.exports = {
    getInstance()
    {
        return new CommandMap();
    }
}