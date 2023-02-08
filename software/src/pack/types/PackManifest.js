class PackManifest
{
    name;
    version;
    uuid;

    /**
     * @param pack {ResourcePack}
     * @param obj {Object}
     */
    constructor(pack, obj)
    {
        obj = JSON.parse(obj);
        this.name=obj["header"].name;
        this.version=obj["header"].version.join('.');
        this.uuid=obj["header"].uuid;
    }

    getName()
    {
        return this.name;
    }

    getVersion()
    {
        return this.version;
    }

    getUuid()
    {
        return this.uuid;
    }
}
module.exports = PackManifest;