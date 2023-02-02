const XMLHttpRequest = require('xhr2');
const request = new XMLHttpRequest();
class WebHook
{
    url;

    username;
    avatar_url;
    content;

    constructor() {}

    /**
     * @param url {string}
     */
    setUrl(url)
    {
        this.url=url;
    }

    /**
     * @param name {string}
     */
    setUsername(name)
    {
        this.username=name;
    }

    /**
     * @param url {string}
     */
    setAvatarUrl(url)
    {
        this.avatar_url=url;
    }

    /**
     * @param str {string}
     */
    setContent(str)
    {
        this.content=str;
    }

    send()
    {
        request.open("POST", this.url);
        request.setRequestHeader('Content-type', 'application/json');

        let data = {username: this.username, avatar_url: this.avatar_url, content: this.content};

        request.send(JSON.stringify(data));
    }
}
module.exports = WebHook;