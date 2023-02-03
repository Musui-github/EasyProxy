module.exports = {
    name: "set_time",

    /**
     * @param Player {Player}
     * @param packet {Packet}
     */
    receive(Player, packet)
    {
        let time = packet.params.time;
        Player.getWorldManager().setTimeServer(time);
        if(!Player.getWorldManager().getTimeCycle()){
            packet.params.time=Player.getWorldManager().getTime();
            if(Player.getWorldManager().getTime() === 0){
                time++;
                Player.setTimeServer(time);
                Player.setTime(time);
            }
        }
    }
}