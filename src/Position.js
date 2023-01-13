class Position
{
    obj;

    constructor(obj)
    {
        this.obj=obj;
    }

    getX() {return this.obj.x;}
    getY() {return this.obj.y;}
    getZ() {return this.obj.z;}

    getYaw() {return this.obj.yaw;}
    getPitch() {return this.obj.pitch;}

    getWorld() {return this.obj.world;}
}
module.exports = Position;