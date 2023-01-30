class HungerManager
{
    player;

    food;
    saturation;
    health;

    /** @param Player {Player} */
    constructor(Player)
    {
        this.player = Player;
        this.food = this.player.food;
        this.saturation = this.player.saturation;
        this.health = this.player.health;
    }

    /** @returns {number} */
    getPlayerFood()
    {
        return this.food;
    }

    /** @returns {number} */
    getPlayerSaturation()
    {
        return this.saturation;
    }

    /** @returns {number} */
    getPlayerHealth()
    {
        return this.health;
    }

    setPlayerHunger(number)
    {
        this.food = number;
    }

    setPlayerSaturation(number)
    {
        this.saturation = number;
    }

    setPlayerHealth(number)
    {
        this.health = number;
    }
}

module.exports = {HungerManager};