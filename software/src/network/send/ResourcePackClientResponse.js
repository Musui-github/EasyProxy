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
                packs.forEach((pack) => packet.params.resourcepackids.push(`${pack.getPackUuid()}_${pack.getVersion()}`));

                PackManager.download(player);
                break;
        }
    }
}