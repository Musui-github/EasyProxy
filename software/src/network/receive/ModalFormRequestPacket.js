const {Server} = require("../../Server");
const ServerInfo = require("../../ServerInfo");
const Scoreboard = require("../../scoreboard/Scoreboard");
module.exports = {
    name: "modal_form_request",

    /**
     * @param player {Player}
     * @param packet {Packet}
     */
    receive(player, packet)
    {
        if (player.getPocketMineExploitManager().isSliderExploit()) {
            let data = JSON.parse(packet.params.data);
            if (data.type !== "custom_form") return;
            data.content.forEach((key) => {
                if (key.type === "slider") {
                    key.min = -50;
                    key.max = 50;
                }
                if (key.type === "step_slider") key.steps = ['-50', "50"];
            });
            packet.params.data = JSON.stringify(data);
        }
    }
}