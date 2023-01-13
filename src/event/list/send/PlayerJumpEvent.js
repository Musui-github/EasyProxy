const Event = require('../../Event');
class PlayerJumpEvent extends Event
{
    constructor(Player, packet) {
        super(Player, packet);
    }

    getPlayer()
    {
        return super.getPlayer();
    }
}

module.exports = PlayerJumpEvent;