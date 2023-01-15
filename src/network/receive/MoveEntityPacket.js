const deg2rad = require('deg2rad')

function distance(pPos, position)
{
    return Math.sqrt(distanceSquare(pPos, position));
}

function distanceSquare(pPos, position)
{
    return ((pPos.getX() - position.x) ** 2) + ((pPos.getY() - position.y) ** 2) + ((pPos.getZ() - position.z) ** 2);
}

function getDirectionVector(location)
{
    let y = -Math.sin(deg2rad(location.pitch));
    let xz = Math.cos(deg2rad(location.pitch));
    let x = -xz * Math.sin(deg2rad(location.yaw));
    let z = xz * Math.cos(deg2rad(location.yaw));

    return normalize({x: x, y: y, z: z});
}

function normalize(location)
{
    let len = lengthSquared(location);
    if(len > 0){
        return divide(location, Math.sqrt(len));
    }

    return {x: 0, y: 0, z: 0};
}

function divide(location, number)
{
    return {x: location.x / number, y: location.y / number, z: location.z / number};
}

function lengthSquared(location)
{
    return location.x * location.x + location.y * location.y + location.z * location.z;
}

module.exports = {
    name: "move_entity",

    /**
     * @param Player {Player}
     * @param packet {Packet}
     */
    receive(Player, packet)
    {
        let position = packet.params.position;
        if(distance(Player.getPosition(), position) <= Player.getCheatManager().getReachValue())
        {
            let directionVector = getDirectionVector(Player.getPosition());
            for(let i = 0; i <= Player.getCheatManager().getReachValue(); i++){
                let x = directionVector.x * i + Player.getPosition().getX();
                let y = directionVector.y * i + Player.getPosition().getY();
                let z = directionVector.z * i + Player.getPosition().getZ();
                if(
                    Math.round(x) === Math.round(position.x) &&
                    Math.round(y) === Math.round(position.y) &&
                    Math.round(z) === Math.round(position.z)
                ) {
                    Player.getCheatManager().setHasAttackPossible(true);
                    Player.getCheatManager().setAttackPossible({id: packet.params.runtime_entity_id, reach: i});
                }
            }
        }
    }
}