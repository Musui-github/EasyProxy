const Logger = require("./logger/Logger");
const ConsoleCommand = require("./command/ConsoleCommand");

class ConsoleSender
{
    constructor() {}

    sendMessage(str)
    {
        Logger.info(str);
    }
}
module.exports = ConsoleSender;