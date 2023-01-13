module.exports = {
    prefix: "§dEasyProxy §8| §f",

    BLACK: this.ESCAPE + "0",
    DARK_BLUE: this.ESCAPE + "1",
    DARK_GREEN: this.ESCAPE + "2",
    DARK_AQUA: this.ESCAPE + "3",
    DARK_RED: this.ESCAPE + "4",
    DARK_PURPLE: this.ESCAPE + "5",
    GOLD: this.ESCAPE + "6",
    GRAY: this.ESCAPE + "7",
    DARK_GRAY: this.ESCAPE + "8",
    BLUE: this.ESCAPE + "9",
    GREEN: this.ESCAPE + "a",
    AQUA: this.ESCAPE + "b",
    RED: this.ESCAPE + "c",
    LIGHT_PURPLE: this.ESCAPE + "d",
    YELLOW: this.ESCAPE + "e",
    WHITE: this.ESCAPE + "f",
    MINECOIN_GOLD: this.ESCAPE + "g",

    ESCAPE: "\xc2\xa7", //§
    EOL: "\n",
    OBFUSCATED: this.ESCAPE + "k",
    BOLD: this.ESCAPE + "l",
    STRIKETHROUGH: this.ESCAPE + "m",
    UNDERLINE: this.ESCAPE + "n",
    ITALIC: this.ESCAPE + "o",

    getPrefix()
    {
        return this.prefix;
    },

    setPrefix(value)
    {
        this.prefix = value;
    },
}