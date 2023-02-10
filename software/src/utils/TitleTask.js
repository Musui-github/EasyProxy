const Task = require("../task/Task");
const TaskManager = require("../task/TaskManager");
const VersionInfo = require("../VersionInfo");
const ServerInfo = require("../ServerInfo");

class TitleTask extends Task
{
    constructor()
    {
        let data = {};
        data["name"]=VersionInfo.NAME;
        data["version"]=VersionInfo.VERSION;


        super(TaskManager.TYPE_REPEAT, 1000, data);
    }

    onRun()
    {
        process.title = `${this.data["name"]} ${this.data["version"]} | Online ${ServerInfo.getServer().getOnlinesPlayers()} | Memory ${process.memoryUsage.rss()}`;
    }
}
module.exports = TitleTask;