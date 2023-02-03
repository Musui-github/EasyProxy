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

const SetDisplayObjectivePacket = require("../packet/SetDisplayObjectivePacket");
const SetScorePacket = require("../packet/SetScorePacket");
class Scoreboard
{
    player;
    displayName;

    lines = [];

    entries = [];

    /** @param Player {Player} */
    constructor(Player)
    {
        this.player = Player;
    }

    /** @param value {string} */
    setScoreboardName(value)
    {
        this.displayName=value;
    }

    getScoreboardName()
    {
        return this.displayName;
    }

    /** @param value {string} */
    addLine(value)
    {
        this.lines.push(value);
    }

    getLines()
    {
        return this.lines;
    }

    setEntries(entries)
    {
        this.entries=entries;
    }

    getEntries()
    {
        return this.entries;
    }

    send()
    {
        let pk1 = new SetDisplayObjectivePacket(this.player);
        pk1.create(this.displayName);

        let pk2 = new SetScorePacket(this.player);
        let entries = [];
        for (let i = 0; i < this.lines.length; i++) {
            pk2.create(i, this.lines[i]);
            entries.push({
                scoreboard_id: i,
                objective_name: 'objective',
                score: i,
                entry_type: 'fake_player',
                custom_name: this.lines[i]
            });
        }

        this.player.getScoreboardContent().setEntries(entries);
        this.lines=[];
    }
}

module.exports = Scoreboard;