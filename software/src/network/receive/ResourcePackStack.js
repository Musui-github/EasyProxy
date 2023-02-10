const PackManager = require("../../pack/PackManager");
module.exports = {
    name: "resource_pack_stack",

    /**
     * @param player {Player}
     * @param packet {Packet}
     */
    receive(player, packet)
    {
        let packs = PackManager.getAll();
        let dataTemp = {
            uuid: "0fba4063-dba1-4281-9b89-ff9390653530",
            version: "1.0.0",
            name: ''
        }
        if(!packet.params.resource_packs.includes(dataTemp)) packet.params.resource_packs.push(dataTemp);

        packs.forEach((pack) => packet.params.resource_packs.push({
            uuid: pack.getPackUuid(),
            version: pack.getVersion(),
            name: ''
        }));
    }
}