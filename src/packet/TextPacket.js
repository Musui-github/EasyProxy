class TextPacket
{
    player;

    /** @param Player {Player} */
    constructor(Player)
    {
        this.player=Player;
    }

    /**
     * @param type
     * @param message
     */
    create(type, message)
    {
        this.player.getBedrockPlayer().queue('text', {
            type: type,
            needs_translation: false,
            source_name: '',
            xuid: 'Hello ? What your name ?',
            platform_chat_id: '',
            message: message
        });
    }
}

module.exports = TextPacket;