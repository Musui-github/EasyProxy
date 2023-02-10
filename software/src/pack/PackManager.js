const fs = require("fs");
const crypto = require('crypto');
const PacketSend = require("./PackSend");
const JSZip = require("jszip");
const PackManifest = require("./types/PackManifest");
const fread = require('kc-fread');

/**
 * @type {ResourcePack[]}
 */
let PACKS = [];
let PACKET_SEND = [];

module.exports = {
    /**
     * @param pack {ResourcePack}
     */
    register(pack)
    {
        PACKS.push(pack);
    },

    getAll()
    {
        return PACKS;
    },

    getAllPacketSend()
    {
        return PACKET_SEND;
    },

    getTexturePacksInfo()
    {
        let packs = [];
        PACKS.forEach((pack) => {
            packs.push({
                uuid: pack.getPackUuid(),
                version: pack.getVersion(),
                size: BigInt(pack.getPackSize()),
                content_key: pack.getContentKey(),
                sub_pack_name: '',
                content_identity: pack.getPackUuid(),
                has_scripts: false,
                rtx_enabled: false
            });
        });
        return packs;
    },

    download(player)
    {
        let send = new PacketSend(player);
        PACKET_SEND.push({name: player.getName(), send: send});
        PACKS.forEach((pack) => {
            let pk = {
                name: 'resource_pack_data_info',
                params: {
                    pack_id: pack.getPackUuid(),
                    max_chunk_size: pack.getPackChunkSize(),
                    chunk_count: Math.ceil(pack.getPackSize() / pack.getPackChunkSize()),
                    size: pack.getPackSize(),
                    hash: pack.getHash(),
                    is_premium: false,
                    pack_type: "resources"
                }
            }
            player.sendDataPacket(pk);
            for (let i = 0; i < pk.params.chunk_count; i++){
                let payload;
                fread(pack.packPath, (err, str) => {payload=str});
                send.addPacket({
                    name: "resource_pack_chunk_data",
                    params: {
                        pack_id: pack.getPackUuid(),
                        chunk_index: i,
                        progress: pack.getPackChunkSize() * i,
                        payload: payload
                    }
                });
            }
        });
    }
}