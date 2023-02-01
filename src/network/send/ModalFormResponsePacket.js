const Item = require("../../item/Item");
const FormID = require("../../form/FormID");
module.exports = {
    name: "modal_form_response",

    /**
     * @param Player {Player}
     * @param packet {Packet}
     */
    send(Player, packet)
    {
        /*** @type {Form}*/
        let form = FormID.getFormDataByID(packet.params.form_id);
        if (!form)return;
        let player_form = form.getPlayer();
        if(player_form !== Player) return false;
        if(!packet.params.has_response_data)return false;
        form.handleCallable(packet.params.data);
    }
}