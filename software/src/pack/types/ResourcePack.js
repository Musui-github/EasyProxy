const jsZip = require('jszip');
const JSZip = require("jszip");
const fs = require("fs");
const PackManifest = require("./PackManifest");
const crypto = require("crypto");

let $class;
let contains;

class ResourcePack
{
    packSize = 0;
    packChunkSize = 128 * 1024;
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
                });
            });
        });
    }

    getPackSize()
    {
        if(this.packSize === 0) {
            let stats = fs.statSync(this.packPath);
            this.packSize = stats.size;
        }
        return this.packSize;
    }

    getPackChunkSize()
    {
        return this.packChunkSize;
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

    getHash()
    {
        let fileBuffer = fs.readFileSync(this.getPackPath());
        let hashSum = crypto.createHash('sha256');
        hashSum.update(fileBuffer);

        let myFileAsBuffer = fs.readFileSync(this.getPackPath(), { flag: 'r' });
        return hashSum.digest(myFileAsBuffer);
    }

    getPackChunk(offset, size)
    {
        fs.readFile(this.packPath, offset);
        return fs.readFile(this.packPath, size);
    }
}
module.exports = ResourcePack;