class Event
{
    player;
    packet;

    canceled = false;

    constructor(Player, packet)
    {
        this.player=Player;
        this.packet=packet;
    }

    /**
     * @returns {Player}
     */
    getPlayer()
    {
        return this.player;
    }

    /**
     * @param value {boolean}
     */
    cancel(value = true)
    {
        this.canceled=value;
    }

    /**
     * @return {boolean}
     */
    isCancelled()
    {
        return this.canceled;
    }
}
module.exports = Event;