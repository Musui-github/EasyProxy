const PluginBase = require("../../../../../src/plugin/PluginBase");
const CommandMap = require("../../../../../src/command/CommandMap");

class Main extends PluginBase
{
    onEnable() {
        super.onEnable();
        CommandMap.getInstance().register(this.getDataPlugin() + '/src/Zwuiix/commands/SpeedCommand.js');
    }
}
module.exports = Main;