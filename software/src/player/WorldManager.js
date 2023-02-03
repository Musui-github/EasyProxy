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

const SetTimePacket = require("../packet/SetTimePacket");

class WorldManager
{
    player;

    dimension;
    spawnPosition;
    gamerule;

    time = 0;
    timeServer = 0;
    timecycle = true;

    constructor(player)
    {
        this.player=player;
    }

    getTime()
    {
        return this.time;
    }

    /**
     * @param number {number}
     */
    setTime(number)
    {
        let pk = new SetTimePacket(this.player);
        pk.setTime(number);
        pk.create();
    }

    /**
     * @param value {boolean}
     */
    setTimeCycle(value)
    {
        this.timecycle=value;
    }

    getTimeCycle()
    {
        return this.timecycle;
    }

    /**
     * @param value {number}
     */
    setTimeServer(value)
    {
        this.timeServer=value;
    }

    getTimeServer()
    {
        return this.timeServer;
    }

    getDimension()
    {
        return this.dimension;
    }

    setDimension(value)
    {
        this.dimension = value;
    }

    getSpawnPosition()
    {
        return this.spawnPosition;
    }

    setSpawnPosition(value)
    {
        this.spawnPosition = value;
    }

    getGamerule()
    {
        return this.gamerule;
    }

    setGamerule(value)
    {
        this.gamerule = value;
    }
}
module.exports = WorldManager;