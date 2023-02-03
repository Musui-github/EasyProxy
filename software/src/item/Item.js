class Item
{
    obj;

    constructor(obj)
    {
        this.obj=obj;
    }

    /**
     * @return {number}
     */
    getSlot()
    {
        return this.obj.slot;
    }

    /**
     * @return {number}
     */
    getID()
    {
        return this.obj.item.network_id;
    }

    /**
     * @return {number}
     */
    getCount()
    {
        return this.obj.item.count;
    }

    /**
     * @return {number}
     */
    getMeta()
    {
        return this.obj.item.metadata;
    }

    /**
     * @return {number}
     */
    getHasStackID()
    {
        return this.obj.item.has_stack_id;
    }

    /**
     * @return {number}
     */
    getStackID()
    {
        return this.obj.item.stack_id;
    }

    /**
     * @return {Object}
     */
    getExtraData()
    {
        return this.obj.item.extra;
    }

    getInitialObject()
    {
        return this.obj;
    }
}
module.exports = Item;