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

let SERVER_LOGS = [];

const colors = require('colors');
const fs = require("fs");
const Path = require("path");

let TYPE = {
    info: "INFO",
    notice: "NOTICE",
    warning: "WARNING",
    debug: "DEBUG",
    error: "ERROR"
};

module.exports = {

    async info(log)
    {
        await this.writePrefix(TYPE.info, log);
    },

    async notice(log)
    {
        await this.writePrefix(colors.cyan(TYPE.notice), log);
    },

    async warn(log)
    {
        await this.writePrefix(colors.yellow(TYPE.warning), log);
    },

    async debug(log)
    {
        await this.writePrefix(colors.underline(TYPE.debug), log);
    },

    async error(log)
    {
        await this.writePrefix(colors.red(TYPE.error), log);
    },

    async writePrefix(prefix, log)
    {
        await write(`${colors.gray(new Date().toLocaleDateString().replaceAll('/', "-"))} ${colors.gray("[" + Date.now() + "]")} [Proxy Thread/${prefix}]: ${log}`);
    },
};

async function write(log)
{
    console.log(log);

    try {
        fs.readFileSync(Path.join(process.argv[2] + '\\logs.txt'), 'utf-8');
    }catch (e) {
        fs.writeFileSync(Path.join(process.argv[2] + '\\logs.txt'), "" +
            "/**\n" +
            " *\n" +
            " *  ███████╗ █████╗ ███████╗██╗   ██╗██████╗ ██████╗  ██████╗ ██╗  ██╗██╗   ██╗\n" +
            " *  ██╔════╝██╔══██╗██╔════╝╚██╗ ██╔╝██╔══██╗██╔══██╗██╔═══██╗╚██╗██╔╝╚██╗ ██╔╝\n" +
            " *  █████╗  ███████║███████╗ ╚████╔╝ ██████╔╝██████╔╝██║   ██║ ╚███╔╝  ╚████╔╝\n" +
            " *  ██╔══╝  ██╔══██║╚════██║  ╚██╔╝  ██╔═══╝ ██╔══██╗██║   ██║ ██╔██╗   ╚██╔╝\n" +
            " *  ███████╗██║  ██║███████║   ██║   ██║     ██║  ██║╚██████╔╝██╔╝ ██╗   ██║\n" +
            " *  ╚══════╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝\n" +
            " *\n" +
            " *  Release by EasyProxy's Project!\n" +
            " *  Github: https://https://github.com/Zwuiix-cmd/EasyProxy\n" +
            " *  Contributors:\n" +
            " *  @Zwuiix-cmd\n" +
            " *  @UnNyanCat\n" +
            " *  @Zaelee\n" +
            " *  @Nya-Enzo\n" +
            " *\n" +
            " */\n\n", 'utf-8');
    }

    let fileSync = fs.readFileSync(Path.join(process.argv[2] + '\\logs.txt'), 'utf-8');
    fileSync += `${log}\n`;
    fs.writeFileSync(Path.join(process.argv[2] + '\\logs.txt'), fileSync, 'utf-8');
}