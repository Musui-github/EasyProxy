const Event = require('../../Event');
class PlayerEmoteEvent extends Event
{
    constructor(Player, packet) {
        super(Player, packet);
    }

    getPlayer()
    {
        return super.getPlayer();
    }

    /**
     * @return {number}
     */
    getEntityId()
    {
        return this.packet.params.entity_id;
    }

    /**
     * @return {string}
     */
    getEmoteId()
    {
        return this.packet.params.emote_id;
    }

    /**
     * @return {number}
     */
    getFlags()
    {
        return this.packet.params.flags;
    }

}
module.exports = PlayerEmoteEvent;