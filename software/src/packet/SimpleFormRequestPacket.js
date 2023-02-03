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

class SimpleFormRequestPacket
{
    player;

    buttons = [];

    /** @param Player {Player} */
    constructor(Player)
    {
        this.player=Player;
    }

    /** @param text {string} */
    createButton(text)
    {
        this.buttons.push({text: text});
    }

    /**
     * @param id {number}
     * @param title {string}
     * @param content {string}
     */
    create(id, title, content)
    {
        let data = {type: "form", title:title, content:content, buttons:this.buttons};
        this.player.getBedrockPlayer().queue("modal_form_request", {
            form_id: id,
            data: JSON.stringify(data)
        });
    }
}

module.exports = SimpleFormRequestPacket;