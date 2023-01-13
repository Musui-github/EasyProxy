const PluginBase = require("../../../../../src/plugin/PluginBase");
const EventManager = require("../../../../../src/event/EventManager");
const Events = require("./Events");
const TaskManager = require("../../../../../src/task/TaskManager");

class Main extends PluginBase
{
    onEnable() {
        super.onEnable();
        EventManager.register(new Events());
    }
}
module.exports = Main;