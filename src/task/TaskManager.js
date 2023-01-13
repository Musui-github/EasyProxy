let tasks = [];
module.exports = {

    TYPE_DELAY: 0,
    TYPE_REPEAT: 1,

    register(task)
    {
        tasks.push(task);
    },

    getAll()
    {
        return tasks;
    }
}