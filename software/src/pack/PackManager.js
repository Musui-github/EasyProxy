const fs = require("fs");
const FileReader = require('filereader');
const crypto = require('crypto');

/**
 * @type {ResourcePack[]}
 */
let PACKS = [];

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

    getTexturePacksInfo()
    {
        let packs = [];
        PACKS.forEach((pack) => {
            packs.push({
                uuid: pack.getPackUuid(),
                version: pack.getVersion(),
                size: pack.getPackSize(),
                content_key: pack.getContentKey(),
                sub_pack_name: '',
                content_identity: pack.getPackUuid(),
                has_scripts: false,
                rtx_enabled: false
            })
        });
        return packs;
    },

    download(player)
    {
        let fileReader = new FileReader();
        PACKS.forEach((pack) => {
            let fileBuffer = fs.readFileSync(pack.getPackPath());
            let hashSum = crypto.createHash('sha256');
            hashSum.update(fileBuffer);
            let hex = hashSum.digest('hex');

            player.getBedrockPlayer().queue('resource_pack_data_info', {
                pack_id: pack.getPackUuid(),
                max_chunk_size: pack.getPackSize(),
                chunk_count: 1,
                size: pack.getPackSize(),
                hash: hex,
                is_premium: false,
                pack_type: "resources"
            });
        })
    }
}