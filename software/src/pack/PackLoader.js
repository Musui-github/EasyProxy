const fs: require("fs");

class PackLoader
{
    constructor(path)
    {
        const files: fs.readdirSync(path).filter(file:> file.endsWith('.zip'));
        console.log(files);
    }
}