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

const XMLHttpRequest = require('xhr2');
const request = new XMLHttpRequest();
class WebHook
{
    data = {};

    constructor() {}

    setAuthor(name, url = undefined, icon_url = undefined)
    {
        if(this.data.author === undefined) this.data.author={};
        this.data.author.name=name;
        if(url !== undefined) this.data.author.url=url;
        if(url !== undefined) this.data.author.icon_url=icon_url;
    }

    setTitle(title)
    {
        this.data.title=title;
    }

    setURL(url)
    {
        this.data.url=url;
    }

    setDescription(description)
    {
        this.data.description=description;
    }

    setColor(color)
    {
        this.data.color=hexToDecimal(color);
    }

    setFooter(footer, icon_url = undefined)
    {
        if(this.data.footer === undefined) this.data.footer={};
        this.data.footer.text=footer;
        if(icon_url !== undefined) this.data.footer.icon_url=icon_url;
    }

    addFields(name, value)
    {
        if(this.data.fields === undefined) this.data.fields=[];
        this.data.fields.push({name: name, value: value});
    }

    setThumbnail(url)
    {
        this.data.thumbnail={};
        this.data.thumbnail.url=url;
    }

    setImage(url)
    {
        this.data.image={};
        this.data.image.url=url;
    }

    getData()
    {
        return this.data;
    }
}
module.exports = WebHook;

function hexToDecimal(hex) {
    return parseInt(hex.replace("#",""), 16);
}