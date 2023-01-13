module.exports = {
    name: "set_score",

    receive(Player, packet)
    {
        if(Player.isScoreboard()){
            packet.params.entries=Player.getScoreboardContent().getEntries();
        }
    }
}