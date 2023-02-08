const jsZip = require('jszip');
const JSZip = require("jszip");
const fs = require("fs");
const PackManifest = require("./PackManifest");

let $class;
let packSize = 0;
let manifest;
let contains;

class ResourcePack
{
    packSize = 0;
    manifest;
    content_key = '';
    packPath = "unknown";
    contains;


    constructor(path)
    {
        $class=this;
        this.packPath=path;
        this.loadPack();
    }

    async loadPack()
    {
        await fs.readFile(this.packPath, async function (err, data) {
            if (err) throw err;
            await JSZip.loadAsync(data).then(async function (zip) {
                contains = zip.files;
                await zip.forEach((key, data) => {
                    if(key === "manifest.json") {
                        zip.file("manifest.json").async("string").then((data) => {
                            $class.manifest = new PackManifest($class, data);
                        });
                    }

                    let info = zip.file(key);
                    try {$class.packSize += info["_data"].compressedSize;}catch (e){}
                });
            });
        });
    }

    getPackSize()
    {
        return this.packSize;
    }

    getPackManifest()
    {
        return this.manifest;
    }

    getPackName()
    {
        return $class.manifest.getName();
    }

    getContentKey()
    {
        return this.content_key;
    }

    getVersion()
    {
        return $class.manifest.getVersion();
    }

    getPackUuid()
    {
        return $class.manifest.getUuid();
    }

    getPackPath()
    {
        return this.packPath;
    }
}
module.exports = ResourcePack;