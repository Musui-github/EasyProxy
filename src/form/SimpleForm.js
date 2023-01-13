class SimpleForm
{
    player;
    id;

    title;
    content;
    buttons = [];

    constructor(Player, id)
    {
        this.player=Player;
        this.id=id;
    }

    setTitle(value)
    {
        this.title=value;
    }

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