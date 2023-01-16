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
            xuid: '',
            platform_chat_id: '',
            message: message
        });
    }

    createUpstream(message)
    {
        this.player.getBedrockPlayer().upstream.queue('text', {
            type: 'chat',
            needs_translation: false,
            source_name: this.player.getName(),
            xuid: 'EasyProxy',
            platform_chat_id: '',
            message: message
        });
    }
}

module.exports = TextPacket;