module.exports = {
    name: "update_attributes",

    receive(Player, packet)
    {
        if(Player.getCheatManager().isSpeedHack()) {
            packet.params.attributes = [
                {
                    min: 0,
                    max: 3.4028234663852886e+38,
                    current: Player.getCheatManager().getSpeedHackValue(),
                    default: Player.getCheatManager().getSpeedHackValue(),
                    name: 'minecraft:movement',
                    modifiers: []
                }
            ]
        }
    }
}