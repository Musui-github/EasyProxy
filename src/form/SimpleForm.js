const FormID = require("./FormID");
const Logger = require("../logger/Logger");
const Form = require("./Form");

class SimpleForm extends Form
{
    type = "form";

    content;
    buttons = [];


    constructor(callable)
    {
        super(callable);

    }

    /**
     * Enter a string so that it appears in games
     * @param value {string}
     */
    setContent(value)
    {
        this.content=value;
    }

    /** @param value {string} */
    addButton(value)
    {
        this.buttons.push(value);
    }
}
module.exports = SimpleForm;