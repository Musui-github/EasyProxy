const Event = require('../../Event');
class PlayerJoinEvent extends Event
{
    constructor(Player, packet) {
        super(Player, packet);
    }
}
module.exports = PlayerJoinEvent;