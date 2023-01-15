class SetPlayerGameTypePacket
{
    player;

    /** @param Player {Player} */
    constructor(Player)
    {
        this.player=Player;
    }

    /**
     * @param gamemode {string}
     */
    create(gamemode)
    {
        this.player.getBedrockPlayer().queue("set_player_game_type", {
            gamemode: gamemode
        });
    }
}

module.exports = SetPlayerGameTypePacket;