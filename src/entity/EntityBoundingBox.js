class EntityBoundingBox
{
    height = 1.7999999523162842;
    width = 0.6000000238418579;

    constructor(height, width)
    {
        this.height=height;
        this.width=width;
    }

    /**
     * @return {number}
     */
    getHeight()
    {
        return this.height;
    }

    /**
     * @return {number}
     */
    getWidth()
    {
        return this.width;
    }
}
module.exports = EntityBoundingBox;