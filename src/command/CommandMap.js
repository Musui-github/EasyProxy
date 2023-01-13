const Path = require("path");
let commands = [];
class CommandMap
{
    registerDefault(command)
    {
        console.log(`[COMMAND] : ${command.getName()} has been registered successfully!`);
        commands.push(command);
    }

    register(folder)
    {
        let req = require(Path.join(folder));
        let command = new req();
        console.log(`[COMMAND] : ${command.getName()} has been registered successfully!`);
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