/**
 *
 *  ███████╗ █████╗ ███████╗██╗   ██╗██████╗ ██████╗  ██████╗ ██╗  ██╗██╗   ██╗
 *  ██╔════╝██╔══██╗██╔════╝╚██╗ ██╔╝██╔══██╗██╔══██╗██╔═══██╗╚██╗██╔╝╚██╗ ██╔╝
 *  █████╗  ███████║███████╗ ╚████╔╝ ██████╔╝██████╔╝██║   ██║ ╚███╔╝  ╚████╔╝
 *  ██╔══╝  ██╔══██║╚════██║  ╚██╔╝  ██╔═══╝ ██╔══██╗██║   ██║ ██╔██╗   ╚██╔╝
 *  ███████╗██║  ██║███████║   ██║   ██║     ██║  ██║╚██████╔╝██╔╝ ██╗   ██║
 *  ╚══════╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝
 *
 *  Release by EasyProxy's Project!
 *  Github: https://https://github.com/Zwuiix-cmd/EasyProxy
 *
 */


const fs = require("fs");
const Path = require("path");
const Effect = require("../effect/Effect");
const EffectId = require("../effect/EffectIds");

class Packet
{
    player;

    /** @param player {Player} */
    constructor(player)
    {
        this.player=player;

        this.receive();
        this.send();

        player.getBedrockPlayer().on('clientbound', (pk) => {
            //console.log(pk.name, pk.params);
        });

        player.getBedrockPlayer().on('serverbound', (pk) => {
        });
    }

    receive()
    {
        const eventFiles = fs.readdirSync(Path.join(process.cwd() + '/src/network/receive')).filter(file => file.endsWith('.js'));
        this.player.getBedrockPlayer().on('clientbound', (pk) => {
            for (const file of eventFiles) {
                /** @var Event */
                const pkg = require(`./receive/${file}`);
                if(pkg.name === pk.name) {
                    pkg.receive(this.player, pk);
                }
            }
        });
    }

    send()
    {
        const eventFiles = fs.readdirSync(Path.join(process.cwd() + '/src/network/send')).filter(file => file.endsWith('.js'));
        this.player.getBedrockPlayer().on('serverbound', (pk) => {
            for (const file of eventFiles) {
                const pkg = require(`./send/${file}`);
                if(pkg.name === pk.name) {
                    pkg.send(this.player, pk);
                }
            }
        });
    }
}

module.exports = Packet;