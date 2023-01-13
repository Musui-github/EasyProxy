const Event = require('../../Event');
class PlayerChatEvent extends Event
{
    constructor(Player, packet) {
        super(Player, packet);
    }

    /**
     * @returns {string}
     */
    getMessage()
    {
        return this.packet.params.message;
    }

    /**
     * @param value {string}
     */
    setMessage(value)
    {
        this.packet.params.message=value;
    }
}
module.exports = PlayerChatEvent;