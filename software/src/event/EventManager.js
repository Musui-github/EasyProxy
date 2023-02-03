let events = [];
module.exports = {
    register(event)
    {
        events.push(event);
    },

    getALl()
    {
        return events;
    }
}