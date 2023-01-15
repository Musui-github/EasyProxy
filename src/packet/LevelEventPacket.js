class LevelEventPacket
{
    player;

    /** @param Player {Player} */
    constructor(Player)
    {
        this.player=Player;
    }

    /**
     * @param event
     * @param position
     * @param data
     */
    create(event, position, data = 0)
    {
        this.player.getBedrockPlayer().queue("level_event", {
            event: event,
            position: position,
            data: data
        });
    }
}

module.exports = LevelEventPacket;