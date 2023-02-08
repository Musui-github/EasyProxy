const PackManager = require("../../pack/PackManager");
module.exports = {
    name: "resource_packs_info",

    /**
     * @param player {Player}
     * @param packet {Packet}
     */
    receive(player, packet)
    {
        let packs = PackManager.getTexturePacksInfo();
        packs.forEach((pack) => packet.params.texture_packs.push(pack));
    }
}