const Event = require('../../Event');
class PlayerInteractEvent extends Event
{
    constructor(Player, packet) {
        super(Player, packet);
    }

    getPlayer()
    {
        return super.getPlayer();
    }

}