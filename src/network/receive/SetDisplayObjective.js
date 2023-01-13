module.exports = {
    name: "set_display_objective",

    receive(Player, packet)
    {
        if(Player.isScoreboard()){
            packet.params.display_name=Player.getScoreboardContent().getScoreboardName();
        }
    }
}