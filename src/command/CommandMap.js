const Path = require("path");
const Logger = require("../logger/Logger");
const {getLangConfig} = require("../ServerInfo");
let commands = [];
class CommandMap
{
    registerDefault(command)
    {
        Logger.debug(getLangConfig()["command"]["registered-success"].replace("{COMMAND}", command.getName()));
        commands.push(command);
    }

    register(folder)
    {
        let req = require(Path.join(folder));
        let command = new req();
        Logger.debug(getLangConfig()["command"]["registered-success"].replace("{COMMAND}", command.getName()));
        commands.push(command);
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