const Event = require('../../Event');
class PlayerCommandProcessEvent extends Event
{
    constructor(Player, packet) {
        super(Player, packet);
    }

    /**
     * @returns {string}
     */
    getCommand()
    {
        return this.packet.params.command;
    }

    /**
     * @param value {string}
     */
    setCommand(value)
    {
        this.packet.command=value;
    }
}
module.exports = PlayerCommandProcessEvent;