const PluginBase = require("../../../../../src/plugin/PluginBase");
const CommandMap = require("../../../../../src/command/CommandMap");
const EventManager = require("../../../../../src/event/EventManager");
const EventListener = require("./EventListener");

class Main extends PluginBase
{
    onEnable() {
        super.onEnable();
        CommandMap.getInstance().register(this.getDataPlugin() + '/src/EasyProxy/commands/NightVisionCommand.js');
        CommandMap.getInstance().register(this.getDataPlugin() + '/src/EasyProxy/commands/TimeCommand.js');
        CommandMap.getInstance().register(this.getDataPlugin() + '/src/EasyProxy/commands/HitboxCommand.js');
        EventManager.register(new EventListener());
    }
}
module.exports = Main;