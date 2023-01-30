/**
 *
 *  ███████╗ █████╗ ███████╗██╗   ██╗██████╗ ██████╗  ██████╗ ██╗  ██╗██╗   ██╗
 *  ██╔════╝██╔══██╗██╔════╝╚██╗ ██╔╝██╔══██╗██╔══██╗██╔═══██╗╚██╗██╔╝╚██╗ ██╔╝
 *  █████╗  ███████║███████╗ ╚████╔╝ ██████╔╝██████╔╝██║   ██║ ╚███╔╝  ╚████╔╝
 *  ██╔══╝  ██╔══██║╚════██║  ╚██╔╝  ██╔═══╝ ██╔══██╗██║   ██║ ██╔██╗   ╚██╔╝
 *  ███████╗██║  ██║███████║   ██║   ██║     ██║  ██║╚██████╔╝██╔╝ ██╗   ██║
 *  ╚══════╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝
 *
 *  Release by EasyProxy's Project!
 *  Github: https://https://github.com/Zwuiix-cmd/EasyProxy
 *
 */

const TaskManager = require("./TaskManager");
class Task
{
    ticks;
    type;
    task;

    data;

    constructor(type, ticks, data)
    {
        this.data=data;
        this.ticks=ticks;

        if(type < 0) this.type = TaskManager.TYPE_DELAY;
        if(type > 1) this.type = TaskManager.TYPE_REPEAT;

        if(type === TaskManager.TYPE_DELAY){
            this.task=setTimeout(() => {
               this.onRun();
            }, ticks);
        }else if (type === TaskManager.TYPE_REPEAT){
            this.task=setInterval(() => {
                this.onRun();
            }, ticks);
        }
    }

    stop()
    {
        if(this.type < 0) clearTimeout(this.task);
        if(this.type > 1) clearInterval(this.task);
    }

    onRun() {}
}
module.exports = Task;