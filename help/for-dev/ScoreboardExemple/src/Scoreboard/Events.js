const ServerInfo = require("../../../../../src/ServerInfo");
const TextFormat = require("../../../../../src/format/TextFormat");
const SimpleForm = require("../../../../../src/form/SimpleForm");
const Scoreboard = require("../../../../../src/scoreboard/Scoreboard");
const ScoreboardTask = require("./task/ScoreboardTask");
const TaskManager = require("../../../../../src/task/TaskManager");
const EasyProxyInfo = require("../../../../../src/EasyProxyInfo");
const {Player} = require("../../../../../src/player/Player");

class Events
{
    /*
    Send form when player join
     */
    /**
     * @param event {PlayerJoinEvent}
     */
    onPlayerJoin(event)
    {
        let scoreboard = new Scoreboard(event.getPlayer());
        let task = new ScoreboardTask(TaskManager.TYPE_REPEAT, 1000, [scoreboard, event.getPlayer()]);
    }
}
module.exports = Events;