class RemoveEntityPacket
{
    player;

    /** @param Player {Player} */
    constructor(Player)
    {
        this.player=Player;
    }

    /**
     * @param id {number}
     */
    create(id)
    {
        this.player.getBedrockPlayer().queue('remove_entity', {
            entity_id_self: id
        });
    }
}

module.exports = RemoveEntityPacket;