const fs = require("fs");
const Path = require("path");
const Effect = require("../effect/Effect");
const EffectId = require("../effect/EffectIds");

class Packet
{
    player;

    packets = [
        "add_player", "animate", "animate_entity", "available_commands", "available_entity_identifier",
        "biome_definition", "block_entity_data", "chunk_radius_update", "crafting_data", "creative_content",
        "entity_event", "inventory_content", "inventory_slot", "level_chunk", "level_sound", "mob_armor_equipment",
        "mob_equipment", "modal_form_request", "move_entity", "network_chunk_publisher_update", "network_stack_latency",
        "play_status", "player_skin", "player_list", "remove_entity", "resource_pack_info", "resource_pack_stack",
        "set_display_objective", "set_entity_data", "set_score", "set_time", "join", "start_game", "disconnect",
        "player_auth_input", "set_local_player_as_initialized", "client_cache_status", "update_attributes", "set_entity_motion",
        "command_request", "interact", "emote", "text", "level_sound_event", "update_abilities", "inventory_transaction", "transfer"
    ];

    /** @param player {Player} */
    constructor(player)
    {
        this.player=player;

        this.receive();
        this.send();

        player.getBedrockPlayer().on('clientbound', (pk) => {
            //if(pk.name === "mob_equipment" || pk.name === "entity_event") console.log(pk.name, pk.params);
        });

        player.getBedrockPlayer().on('serverbound', (pk) => {
            //if(pk.name !== "player_auth_input") console.log(pk.name, pk.params);
            //if(pk.name === "inventory_transaction")console.log(pk.params)
        });
    }

    receive()
    {
        const eventFiles = fs.readdirSync(Path.join(process.cwd() + '/src/network/receive')).filter(file => file.endsWith('.js'));
        this.packets.forEach((value) => {
            this.player.getBedrockPlayer().on('clientbound', (pk) => {
                if(pk.name === value){
                    for (const file of eventFiles) {
                        /** @var Event */
                        const pkg = require(`./receive/${file}`);
                        if(pkg.name === pk.name) {
                            pkg.receive(this.player, pk);
                        }
                    }
                }
            });
        });
    }

    send()
    {
        const eventFiles = fs.readdirSync(Path.join(process.cwd() + '/src/network/send')).filter(file => file.endsWith('.js'));
        this.packets.forEach((value) => {
            this.player.getBedrockPlayer().on('serverbound', (pk) => {
                if(pk.name === value){
                    for (const file of eventFiles) {
                        const pkg = require(`./send/${file}`);
                        if(pkg.name === pk.name) {
                            pkg.send(this.player, pk);
                        }
                    }
                }
            });
        });
    }
}

module.exports = Packet;