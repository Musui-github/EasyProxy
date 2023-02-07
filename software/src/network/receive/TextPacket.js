const Effect = require("../../effect/Effect");
const EffectId = require("../../effect/EffectIds");
const {getLangConfiguration} = require("../../ServerInfo");
module.exports = {
    name: "text",

    receive(Player, packet)
    {
        if(!Player.getCheatManager().isAutoWord()) return false;
        let words = ["La première personne a écrire le mot"];
        let included = false;
        let includeWord = "undefined";

        words.forEach((word) => {
            if(packet.params.message.includes(word)) {
                included = true;
                includeWord=word;
            }
        });

        if(!included)return false;

        let msg = "" + packet.params.message;

        let findWord = msg.split(includeWord);
        let find = findWord[1].split(/ +/g);
        let code = find[1];
        Player.getCheatManager().setAutoWordOptions("word", code);
        Player.getCheatManager().setAutoWordOptions("hasResp", true);

        if(!Player.getCheatManager().getAutoWordOptions("autoResp")) Player.sendMessage(getLangConfiguration().getNested("cheats.autoWord.confirm"));
        if(Player.getCheatManager().getAutoWordOptions("autoResp")) Player.sendMessage(code);

        setTimeout(() => Player.getCheatManager().setAutoWordOptions("hasResp", false), 8000);
    }
}