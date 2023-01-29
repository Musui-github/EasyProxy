class HungerManager
{
    player;

    food;
    saturation;

    /** @param Player {Player} */
    constructor(Player)
    {
        this.player = Player;
        this.food = this.player.food;
        this.saturation = this.player.saturation;
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

    setPlayerHunger(number)
    {
        this.food = number;
        console.debug(`${this.player.username} food changed to ${number}`);
    }

    setPlayerSaturation(number)
    {
        this.saturation = number;
        console.debug(`${this.player.username} saturation changed to ${number}`);
    }
}

module.exports = {HungerManager};