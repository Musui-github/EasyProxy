class HealthManager
{
    player;
    health;

    /**
     * @param Player {Player}
     */
    constructor(Player)
    {
        this.player = Player;
        this.health = this.player.health;
    }

    /** @returns {number} */
    getPlayerHealth()
    {
        return this.health;
    }

    setPlayerHealth(number)
    {
        this.health = number;
        console.debug(`${this.player.username} health changed to ${number}`);
    }
}

module.exports = HealthManager;