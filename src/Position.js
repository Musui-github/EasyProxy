const deg2rad = require('deg2rad');

class Position
{
    x;
    y;
    z;

    yaw;
    pitch;

    world;

    constructor(obj)
    {
        this.x=obj.x;
        this.y=obj.y;
        this.z=obj.z;

        this.yaw=obj.yaw;
        this.pitch=obj.pitch;

        this.world=obj.world;
    }

    getX() {return this.x;}
    getY() {return this.y;}
    getZ() {return this.z;}

    /**
     * @return {{x: *, y: *, z: *}}
     */
    getPos()
    {
        return {x: this.getX(), y: this.getY(), z: this.getZ()};
    }

    getYaw() {return this.yaw;}
    getPitch() {return this.pitch;}

    getWorld() {return this.world;}

    distance(position)
    {
        return Math.sqrt(this.distanceSquare(position));
    }

    distanceSquare(position)
    {
        return ((this.getX() - position.x) ** 2) + ((this.getY() - position.y) ** 2) + ((this.getZ() - position.z) ** 2);
    }

    getDirectionVector()
    {
        let y = -Math.sin(deg2rad(this.pitch));
        let xz = Math.cos(deg2rad(this.pitch));
        let x = -xz * Math.sin(deg2rad(this.yaw));
        let z = xz * Math.cos(deg2rad(this.yaw));

        return this.normalize({x: x, y: y, z: z});
    }

    normalize(location)
    {
        let len = this.lengthSquared(location);
        if(len > 0){
            return this.divide(location, Math.sqrt(len));
        }

        return {x: 0, y: 0, z: 0};
    }

    divide(location, number)
    {
        return {x: location.x / number, y: location.y / number, z: location.z / number};
    }

    lengthSquared(location)
    {
        return location.x * location.x + location.y * location.y + location.z * location.z;
    }
}
module.exports = Position;