let plugins = [];
module.exports = {
    load(plugin)
    {
        console.log(`Plugin ${plugin.getName()} has been loaded successfully!`);
        plugins.push(plugin);
    },

    getAll()
    {
        return plugins;
    }
}