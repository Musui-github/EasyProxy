const Item = require("../../item/Item");
const FormID = require("../../form/FormID");
module.exports = {
    name: "modal_form_response",

    /**
     * @param player {Player}
     * @param packet {Packet}
     */
    send(player, packet)
    {
        if(player.getPocketMineExploitManager().isBigFormExploit()){
            let data = JSON.parse(packet.params.data);
            if(Array.isArray(data)){
                let dataTemp = [];
                for (let i = 0; i < data.length; i++){
                    if(data[i] !== null) dataTemp.push(-99999999);
                }
                data = dataTemp;
            }
            packet.params.data = JSON.stringify(data);
            return;
        }

        /*** @type {Form}*/
        let form = FormID.getFormDataByID(packet.params.form_id);
        if (!form)return;
        let player_form = form.getPlayer();
        if(player_form !== player) return false;
        if(!packet.params.has_response_data)return false;
        form.handleCallable(packet.params.data);
    }
}