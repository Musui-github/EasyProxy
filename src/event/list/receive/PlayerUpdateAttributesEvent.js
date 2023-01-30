const Event = require('../../Event');
class PlayerUpdateAttributesEvent extends Event
{
    constructor(Player, packet) {
        super(Player, packet);
    }

    getAttributes()
    {
        return this.packet.params.attributes;
    }
}
module.exports = PlayerUpdateAttributesEvent;