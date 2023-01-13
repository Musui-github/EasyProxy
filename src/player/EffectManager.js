const MobEffectPacket = require("../packet/MobEffectPacket");
const EffectMap = require("../effect/EffectMap");

class EffectManager
{
    player;

    effects = [];

    constructor(Player)
    {
        this.player=Player;
    }

    getAll()
    {
        return this.effects;
    }

    /**
     *
     * @param effect {Effect}
     */
    add(effect)
    {
        let pk = new MobEffectPacket(this.player);
        pk.create(EffectMap.ADD, effect.getID(), effect.getDuration(), effect.getAmplifier(), effect.isVisible());
        this.effects.push(effect.getID());
    }

    remove(id)
    {
        let pk = new MobEffectPacket(this.player);
        pk.create(EffectMap.REMOVE, id, 0, 0, false);
        this.effects.pop(id);
    }

    has(id)
    {
        return this.effects.includes(id);
    }
}
module.exports = EffectManager;