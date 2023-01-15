const Command = require("../../../../../../src/command/Command");
const TextFormat = require("../../../../../../src/format/TextFormat");
const Waypoints = require("../../../../../../src/waypoints/Waypoints");

class WaypointCommand extends Command
{
    constructor() {
        super("waypoint", "Manage waypoints", "waypoint <add:remove:list> <name>");
    }

    onRun(Player, args)
    {
        if(args[1] === "list") {
            console.log(Player.getWaypoints().waypoints);
            Player.sendMessage(TextFormat.prefix + "Here is the list of waypoints!\n§d-");
        } else if(args[2] !== null || args[2] !== undefined) {
            if (args[1] === "add") {
                if(Player.getWaypoints().exists(args[2])) {
                    Player.sendMessage(TextFormat.prefix + `The waypoint §d${args[2]}§f already exists`);
                }
                Player.sendMessage(TextFormat.prefix + `You added the waypoint §d${args[2]}§f successfully!`);
                Player.getWaypoints().add(args[2], `§e\n      ` + TextFormat.LIGHT_PURPLE + `Waypoint      \n§fName: §d${args[2]}\n§e` );
            } else if(args[1] === "remove") {
                Player.sendMessage(TextFormat.prefix + `You removed the waypoint §d${args[2]}§f successfully!`);
                Player.getWaypoints().remove(args[2]);
            }
        } else {
            Player.sendMessage(TextFormat.prefix + "You need to specify the waypoint name!");
        }
    }
}
module.exports = WaypointCommand;