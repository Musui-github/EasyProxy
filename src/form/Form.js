const FormID = require("./FormID");
const Logger = require("../logger/Logger");

class Form
{
    type = "Unknown";

    id;

    title;

    player;

    callable;


    constructor(callable = function () {Logger.error('Form send without callable function')})
    {
        this.id=FormID.sendNextID();
        this.callable=callable;
    }

    setTitle(value)
    {
        this.title=value;
    }
    setPlayer(player)
    {
        this.player=player;
    }

    getPlayer()
    {
        return this.player;
    }

    getCallable()
    {
        return this.callable;
    }

    handleCallable(data)
    {
        if(this.type === "form") data = parseInt(data);
        if(this.type === "custom_form") {
            let tempData = JSON.parse(data);
            let map = new Map();
            for(let i = 0; i <= tempData.length; i++){
                map.set(i, tempData[i]);
            }
            data = map;
        }
        this.callable(this.player, data);
    }
}
module.exports = Form;