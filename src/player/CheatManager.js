const UpdateAttributesPacket = require("../packet/UpdateAttributesPacket");
const {Player} = require("./Player");

class CheatManager
{
    player;

    /**
     * defaults:
     * width: 0.6000000238418579
     * height: 1.7999999523162842
     */
    width = 0.6000000238418579;
    height = 1.7999999523162842;

    hitbox = false;
    speed_hack = false;
    speed_value = 0.13999999523162842;

    constructor(Player)
    {
        this.player=Player;
    }

    isHitbox()
    {
        return this.hitbox;
    }

    /** @param value {boolean} */
    setHitbox(value)
    {
        this.hitbox=value;
    }

    isSpeedHack()
    {
        return this.speed_hack;
    }

    /** @param value {boolean} */
    setSpeedHack(value)
    {
        this.speed_hack=value;
        this.player.syncattributes();
    }

    getSpeedHackValue()
    {
        return this.speed_value;
    }

    /** @param value {number} */
    setSpeedHackValue(value)
    {
        this.speed_value=value;
    }

    getWidth()
    {
        return this.width;
    }

    /** @param value {number} */
    setWidth(value)
    {
        this.width = value;
    }

    getHeight()
    {
        return this.height;
    }

    /** @param value {number} */
    setHeight(value)
    {
        this.height = value;
    }
}
module.exports = CheatManager;