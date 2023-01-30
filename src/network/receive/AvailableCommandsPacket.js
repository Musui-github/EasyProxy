const ServerInfo = require("../../ServerInfo");
module.exports = {
    name: "available_commands",

    receive(Player, packet)
    {
        let commands = ServerInfo.getServer().getCommandMap().getAll();
        packet.params.values_len += commands.length;

        commands.forEach((command) => {
           packet.params.enum_values.push(`/${command.getName()}`);
           packet.params.command_data.push({
               name: `/${command.getName()}`,
               description: command.getDescription(),
               flags: 0,
               permission_level: 0,
               alias: -1,
               overloads: [[{
                   parameter_name: "args",
                   value_type: "raw_text",
                   enum_type: "valid",
                   optional: true,
                   options: {
                       unused: 0,
                       collapse_enum: 0,
                       has_semantic_constraint: 0,
                       as_chained_command: 0,
                       unknown2: 0
                   }
               }]]
           });

            /*if(command.getAliases() !== null) {
                command.getAliases().forEach((alias) => {
                    packet.params.enum_values.push(`/${alias}`);
                    packet.params.command_data.push({
                        name: `/${alias}`,
                        description: command.getDescription(),
                        flags: 0,
                        permission_level: 0,
                        alias: -1,
                        overloads: [[{
                            parameter_name: "args",
                            value_type: "raw_text",
                            enum_type: "valid",
                            optional: true,
                            options: {
                                unused: 0,
                                collapse_enum: 0,
                                has_semantic_constraint: 0,
                                as_chained_command: 0,
                                unknown2: 0
                            }
                        }]]
                    });
                });
            }*/
        });

    }
}