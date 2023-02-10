const bedrock = require('bedrock-protocol');

class FakePlayer
{
    name;
    username;
    address;
    port;

    constructor(name, address, port)
    {
        this.name=name;
        this.address=address;
        this.port=port;

        this.client = bedrock.createClient({
            host: address,
            port: port,
            skipPing: true,
            offline: false,
            username: name,
            connectTimeout: 2500
        });

        this.username = this.client.username;
    }

    getAddress()
    {
        return this.address;
    }

    getPort()
    {
        return this.port;
    }

    getName()
    {
        return this.name;
    }

    getUsername()
    {
        this.username;
    }

    disconnect()
    {
        this.client.close();
    }
}
module.exports = FakePlayer;