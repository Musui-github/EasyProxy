class PacketSend
{
    packets = [];
    player;

    constructor(player)
    {
        this.player=player;
    }

    addPacket(packet)
    {
        this.packets.push(packet);
    }

    tick(currentTick)
    {
        let packets = [];
        this.packets.forEach((key, value) => {
            if(key === 0) this.player.sendDataPacket(value);
            if(key !== 0) packets.push(value);
        });
        this.packets=packets;
    }
}
module.exports = PacketSend;