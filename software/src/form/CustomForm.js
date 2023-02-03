const FormID = require("./FormID");
const Logger = require("../logger/Logger");
const Form = require("./Form");

class CustomForm extends Form
{
    type = "custom_form";

    content = [];

    constructor(callable)
    {
        super(callable);
    }

    /**
     * @param text {string}
     * @param placeholder {string}
     * @param $default {string|null}
     */
    addInput(text, placeholder = "", $default = null)
    {
        this.addContent({type: "input", text: text, placeholder: placeholder, default: $default});
    }

    /**
     * @param text {string}
     */
    addLabel(text)
    {
        this.addContent({type: "label", text: text});
    }

    /**
     * @param text {string}
     * @param options {array}
     * @param $default {number}
     */
    addDropdown(text, options, $default = -1)
    {
        this.addContent({type: "dropdown", text: text, options: options, default: $default});
    }

    /**
     * @param text {string}
     * @param $default {boolean|null}
     */
    addToggle(text, $default = null)
    {
        this.addContent({type: "toggle", text: text, default: $default});
    }

    addSlider(text, min, max, step = -1, $default = -1)
    {
        this.addContent({type: "slider", text: text, min: min, max: max, step: step, default: $default});
    }

    addStepSlider(text, steps, $default = -1)
    {
        this.addContent({type: "step_slider", text: text, steps: steps, default: $default});
    }

    /**
     * @param obj {Object}
     */
    addContent(obj)
    {
        this.content.push(obj);
    }
}
module.exports = CustomForm;