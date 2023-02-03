class Effect
{
    id;
    duration;
    amplifier;
    visible;

    constructor(id, duration, amplifier = 0, visible = false)
    {
        this.id=id;
        this.duration=duration;
        this.amplifier=amplifier;
        this.visible=visible;
    }

    getID()
    {
        return this.id;
    }

    getDuration()
    {
        return this.duration;
    }

    getAmplifier()
    {
        return this.amplifier;
    }

    isVisible()
    {
        return this.visible;
    }
}
module.exports = Effect;