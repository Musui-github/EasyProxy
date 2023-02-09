const PackManager = require("../../pack/PackManager");
module.exports = {
    name: "resource_pack_client_response",

    /**
     * @param player {Player}
     * @param packet {Packet}
     */
    send(player, packet)
    {
        let step = packet.params.response_status;
        switch (step){
            case "send_packs":
                let packs = PackManager.getAll();
                PackManager.download(player);
                break;
            case "have_all_packs":
                let pk = {name: "resource_pack_stack"}
                break;
            default:
                break;
        }
    }
}