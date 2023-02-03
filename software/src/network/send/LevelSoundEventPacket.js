const SetEntityMotionPacket = require("../../packet/SetEntityMotionPacket");
module.exports = {
    name: "level_sound_event",

    /**
     * @param Player {Player}
     * @param packet {Packet}
     */
    send(Player, packet)
    {
        if(packet.params.sound_id === "AttackNoDamage"){
            if((Player.getCheatManager().isReach() || Player.getCheatManager().isMisplace()) && Player.getCheatManager().hasAttackPossible()){
                Player.getCheatManager().setHasAttackPossible(false);
                Player.attack(Player.getCheatManager().getAttackPossible().id);
                if(Player.getCheatManager().isMisplace()){
                    let default_value = Player.getCheatManager().getSpeedHackValue();
                    let isActivate = Player.getCheatManager().isSpeedHack();

                    if(!isActivate){
                        Player.getCheatManager().setSpeedHack(true);
                        Player.getCheatManager().setSpeedHackValue(default_value * 1.067367821);
                    }

                    setTimeout(() => {
                        if(!isActivate) Player.getCheatManager().setSpeedHack(false);
                        Player.getCheatManager().setSpeedHackValue(default_value);
                    }, 15);

                    /*
                    let pk = new SetEntityMotionPacket(Player);
                    pk.setRuntimeID(Player.getUniqueID());

                    let pos = Player.getCheatManager().getAttackPossible().position;

                    let x = pos.x - Player.getPosition().getX();
                    let z = pos.z - Player.getPosition().getZ();

                    let bX = 0.095;
                    let bY = 0.005;
                    let bZ = 0.095;

                    let f = Math.sqrt(x * x + z * z);
                    if(f <= 0)return;

                    f = 1 / f;
                    let motionX = 0 / 2;
                    let motionY = 0 / 2;
                    let motionZ = 0 / 2;
                    motionX += x * f * bX;
                    motionY += bY;
                    motionZ += z * f * bZ;

                    if(motionY > 0.4) motionY = 0.4;
                    pk.setVelocity({x: motionX, y: motionY, z: motionZ});
                    pk.send();*/
                }
            }
        }
    }
}