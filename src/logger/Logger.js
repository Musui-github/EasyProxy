class Logger
{
    info(log)
    {
        this.writePrefix("Info", log);
    }

    warn(log)
    {
        this.writePrefix("Warning", log);
    }

    debug(log)
    {
        this.writePrefix("Debug", log);
    }

    writePrefix(prefix, log)
    {
        console.log(`[${prefix}] | ${log}`);
    }

    write(log)
    {
        console.log(log);
    }
}

module.exports = Logger;