const Task = require('../../../../../../src/task/Task');
const TaskManager = require("../../../../../../src/task/TaskManager");
const ServerInfo = require("../../../../../../src/ServerInfo");
const EasyProxyInfo = require("../../../../../../src/EasyProxyInfo");
class ScoreboardTask extends Task
{
    constructor(type, ticks, data)
    {
        super(type, ticks, data);
    }

    onRun()
    {
        let scoreboard = this.data[0];
        let player = this.data[1];
        scoreboard.setScoreboardName("§dEasyProxy");
        scoreboard.addLine("§k");
        scoreboard.addLine(" §d" + player.getName());
        scoreboard.addLine(" §8| §fHitbox Enabled: §d" + player.getCheatManager().isHitbox());
        scoreboard.addLine(" §8| §fSpeedhack Enabled: §d" + player.getCheatManager().isSpeedHack());
        scoreboard.addLine("§a");
        scoreboard.addLine(" §dProxyInfo");
        scoreboard.addLine(" §8| §fPlayers: §d" + ServerInfo.getServer().getPlayers().length);
        scoreboard.addLine('§e');
        scoreboard.addLine('§8§o' + EasyProxyInfo.Discord);

        player.setScoreboard(true);
        player.setScoreboardContent(scoreboard);

        scoreboard.send();

    }
}
module.exports = ScoreboardTask;