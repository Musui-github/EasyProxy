class UpdateAbilitiesPacket
{
    player;

    /** @param Player {Player} */
    constructor(Player)
    {
        this.player=Player;
    }

    create()
    {
        this.player.getBedrockPlayer().queue("update_abilities", this.player.abilities);
    }
}

module.exports = UpdateAbilitiesPacket;