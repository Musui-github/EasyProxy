class SetTimePacket
{
    player;

    /** @param Player {Player} */
    constructor(Player)
    {
        this.player=Player;
    }

    /**
     * @param time {number}
     */
    create(time)
    {
        this.player.getBedrockPlayer().queue("set_time", {
            time: time
        });
    }
}

module.exports = SetTimePacket;