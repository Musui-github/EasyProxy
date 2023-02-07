const fs = require("fs");
const ServerInfo = require("../../ServerInfo");
const PlayerCommandProcessEvent = require("../../event/list/send/PlayerCommandProcessEvent");
const EventManager = require("../../event/EventManager");
const PlayerEmoteEvent = require("../../event/list/send/PlayerEmoteEvent");
module.exports = {
    name: "command_request",

    send(Player, packet)
    {
        const EventManager = require("../../event/EventManager");
        let events = EventManager.getALl();
        events.forEach((event) => {
            try {
                let listener = new PlayerCommandProcessEvent(Player, packet);
                event.onPlayerCommandProcess(listener);
                if(listener.isCancelled()){packet = null; return false;}
            }catch (e){}
        });

        let message=packet.params.command;
        if(!message.startsWith('//'))return;

        let args = message.split(/ +/g);

        let commands = ServerInfo.getServer().getCommandMap().getAll();
        commands.forEach((command) => {
           if(`//${command.getName()}` === args[0]){
               command.onRun(Player, args);
               return;
           }
           command.getAliases().forEach((alias) => {
               if(`//${alias}` === args[0]){
                   command.onRun(Player, args);
               }
           });
        });

        packet.params.command = '';
        packet=null;
        return false;
    }
}