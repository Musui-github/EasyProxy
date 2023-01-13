/**
 * @param server {Server}
 */
let server;
module.exports =
{
    /** @param str {string} */
    setServer(str)
    {
        server=str;
    },

    getServer()
    {
        return server;
    }
}