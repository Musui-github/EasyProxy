const PluginBase = require("../../../../../src/plugin/PluginBase");
const CommandMap = require("../../../../../src/command/CommandMap");
const EventManager = require("../../../../../src/event/EventManager");
const EventListener = require("./EventListener");

class Main extends PluginBase
{
    onEnable() {
        super.onEnable();
        let commands = [
            "NightVisionCommand",
            "TimeCommand",
            "HitboxCommand",
            "ReachCommand",
            "TimerCommand",
            "FreeCamCommand",
            "WaypointCommand"
        ];
        commands.forEach(command => {
            CommandMap.getInstance().register(this.getDataPlugin() + `/src/EasyProxy/commands/${command}.js`);
        })
        EventManager.register(new EventListener());
    }
}
module.exports = Main;