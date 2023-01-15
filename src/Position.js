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
}
module.exports = Position;