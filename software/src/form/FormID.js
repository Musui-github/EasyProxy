let ID = new Map();
let NEXT_ID = 1000000;

module.exports = {

    setFormDataByID(id, formData)
    {
        ID.set(id, formData);
    },

    /**
     * @param id
     * @return {any}
     */
    getFormDataByID(id)
    {
        return ID.get(id);
    },

    getAllForm()
    {
        return ID;
    },

    getNextFormID()
    {
        return NEXT_ID;
    },

    sendNextID()
    {
        NEXT_ID++;
        return NEXT_ID;
    }
}