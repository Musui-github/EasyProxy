# How to create a Plugin ?
It's quite simple, just follow the instructions below.

Step 1: To start, you need to create a new folder in the **resources/plugin/** directory.

Step 2: Create a file called plugin.json Then enter the information below *(This is of course an example)*
```json
{
  "name": "ExemplePlugin",
  "author": "Zwuiix",
  "version": 1,
  "main": "src/Zwuiix/Main",
  "description": "This is a exemple plugin!"
}
```

Step 3: Create your main files (src & your name)

Step 4: Create your main file, which for my part is called Main

Step 5: Once your main file, enter the following information
```javascript
const PluginBase = require("../../../../../src/plugin/PluginBase");
const CommandMap = require("../../../../../src/command/CommandMap");

class Main extends PluginBase
{
    onEnable() 
    {
        CommandMap.getInstance().register(this.getDataPlugin() + '/src/Zwuiix/commands/SpeedCommand.js');
    }
}
module.exports = Main;
```

Step 6: Once this is done, we will create the speed command that we recorded above

Step 7: So we will create the commands folder and once created go inside and create the file SpeedCommand.js

```javascript
const Command = require("../../../../../../src/command/Command");
class SpeedCommand extends Command
{
    constructor()
    {
        //    NAME        DESCRIPTION           USAGE                    ALIASES
        super("speed", "edit your speed", 'speed <status:value> <on:off>', []);
    }

    onRun(Player, args)
    {
        // args[0] = "//speed"
        if(isNaN(args[1])) return Player.sendMessage("Arg 1 must be int");
        Player.getCheatManager().setSpeedHackValue(parseFloat(args[1]));
        Player.getCheatManager().setSpeedHack(true);
    }
}
module.exports = SpeedCommand;
```

Step 8: And that's it, if you have followed all the steps, you just have to launch your proxy and test your plugin!