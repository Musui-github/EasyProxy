class Command
{
    name;
    description;
    usage;
    aliases = [];

    constructor(name, description, usage = `${name} <args>`, aliases = [])
    {
        this.name=name;
        this.description=description;
        this.usage=usage;
        if(aliases !== undefined) this.aliases=aliases;
    }

    getName()
    {
        return this.name;
    }

    getDescription()
    {
        return this.description;
    }

    getUsage()
    {
        return this.usage;
    }

    getAliases()
    {
        return this.aliases;
    }
}
module.exports = Command;