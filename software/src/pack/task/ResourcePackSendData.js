const Task = require('../../task/Task');
const PackManager = require("../PackManager");

class ResourcePackSendData extends Task
{
    nextTick = 2;

    constructor()
    {
        super(1, 1000, {});
    }

    onRun()
    {
        this.ticks--;
        if(this.nextTick <= 0){
            this.nextTick = 2;
            PackManager.getAllPacketSend().forEach((pack) => pack.tick());
        }
    }
}
module.exports = ResourcePackSendData;