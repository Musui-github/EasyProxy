
const fs = require("fs");
const { parse } = require('path');
class Config
{
    filename;

    config = {};

    typeConfig;

    defaults;

    nestedCache = {};

    /**
     *
     * @param filename {string}
     * @param typeConfig {string}
     * @param defaults {Object}
     */
    constructor(filename, typeConfig = "json", defaults = {})
    {
        this.defaults = defaults;
        this.typeConfig = typeConfig;
        this.load(this.filename = filename.replace(new RegExp("/", "g"), "\\"));
    }

    /**
     *
     * @param key {string|number|array|object}
     * @param value {string|number|array|object}
     * @return {*}
     */
    get(key, value = undefined)
    {
        return this.config[key] ?? value;
    }

    /**
     *
     * @param entry
     * @param key
     * @return {[string, any][]|string[]|{}}
     */
    getAll(entry = false, key = false)
    {
        return entry ? Object.entries(this.config ?? {}) : (key ? Object.keys(this.config ?? {}) : this.config);
    }

    /**
     *
     * @param values {Object}
     */
    setAll(values)
    {
        this.config = values;
    }

    /**
     *
     * @param key {string|number|array|object}
     * @return {boolean}
     */
    has(key)
    {
        return this.config[key] !== undefined;
    }

    /**
     *
     * @param key {string}
     * @param value {string|number|array|object}
     */
    set(key, value)
    {
        this.config[key] = value;
    }

    /**
     *
     * @param key {string}
     */
    remove(key) {
        if (!this.has(key))
            return;
        delete (this.config[key]);
    }

    getFileName() {
        return this.filename;
    }

    /**
     * Removes all the changes in memory and loads the file again
     */
    reload()
    {
        this.config = {};
        this.nestedCache = {};
        this.load(this.filename);
    }

    /**
     *
     * @param key {string|number|array|object}
     * @param value {string|number|array|object|null}
     */
    setNested(key, value = undefined)
    {
        const vars = key.split(".");
        let baseKey = vars.shift();
        if (baseKey === undefined)
            return;
        if (!this.isLiteralObject(this.config)) {
            this.config = {};
        }
        if (this.config[baseKey] === undefined) {
            this.config[baseKey] = {};
        }
        let base = this.config[baseKey];
        while (vars.length > 0) {
            baseKey = vars.shift();
            if (baseKey === undefined)
                continue;
            if (base[baseKey] === undefined) {
                base[baseKey] = {};
            }
            if (vars.length === 0) {
                base[baseKey] = value;
            }
            else {
                base = base[baseKey];
            }
        }
        this.nestedCache = {};
    }

    /**
     *
     * @param key {string}
     * @param defaults {string|null}
     */
    getNested(key, defaults = undefined)
    {
        if (this.nestedCache[key] !== undefined) {
            return this.nestedCache[key];
        }
        const vars = key.split(".");
        let base = vars.shift();
        if (!this.isLiteralObject(this.config)) {
            this.config = {};
        }
        if (this.config[base] !== undefined) {
            base = this.config[base];
        }
        else {
            return defaults;
        }
        while (vars.length > 0) {
            let baseKey = vars.shift();
            if (baseKey === undefined)
                continue;
            if (this.isLiteralObject(base) && base[baseKey]) {
                base = base[baseKey];
            }
            else {
                return defaults;
            }
        }
        return this.nestedCache[key] = base;
    }

    /**
     * @param key {string}
     */
    removeNested(key)
    {
        this.nestedCache = [];
        const vars = key.split(".");
        let currentNode = this.config;
        while (vars.length > 0) {
            const nodeName = vars.shift();
            if (nodeName === undefined)
                continue;
            if (currentNode[nodeName] !== undefined) {
                if (vars.length === 0) { //final node
                    delete (currentNode[nodeName]);
                }
                if (this.isLiteralObject(currentNode[nodeName])) {
                    currentNode = currentNode[nodeName];
                }
            }
            else {
                break;
            }
        }
    }

    /**
     * @param value {Object}
     * @return {boolean}
     */
    isLiteralObject(value)
    {
        return value.constructor === Object;
    }

    /**
     * @param filename {string}
     */
    load(filename)
    {
        const path = parse(filename);
        if (!fs.existsSync(path.dir)) {
            fs.mkdirSync(path.dir, { recursive: true });
        }
        if (!fs.existsSync(filename)) {
            this.config = this.defaults;
            if (!fs.existsSync(filename)) {
                fs.writeFileSync(filename, this.defaultToString(), { encoding: "utf-8" });
            }
        }
        this.config = this.stringToConfig(filename);
    }

    save()
    {
        fs.writeFileSync(this.filename, this.configToString(), { encoding: "utf-8" });
    }

    /**
     *
     * @param filename {string}
     * @return {*}
     */
    stringToConfig(filename)
    {
        let readConfig = undefined;
        switch (this.typeConfig) {
            case "json": {
                readConfig = JSON.parse(fs.readFileSync(filename, { encoding: "utf-8" }));
                break;
            }
            default: {
                throw "no existe type config";
            }
        }
        if (readConfig === undefined) {
            throw "Error Read your config";
        }
        return readConfig;
    }

    /**
     * @return {Object}
     */
    configToString()
    {
        let writeConfig = undefined;
        switch (this.typeConfig) {
            case "json": {
                writeConfig = JSON.stringify(this.config, [], 2);
                break;
            }
            default: {
                throw "no existe type config";
            }
        }
        if (writeConfig === undefined) {
            throw "Error Write your config";
        }
        return writeConfig;
    }

    /**
     * @return {Object}
     */
    defaultToString()
    {
        let writeConfig = undefined;
        switch (this.typeConfig) {
            case "json": {
                writeConfig = JSON.stringify(this.defaults, [], 2);
                break;
            }
            default: {
                throw "no existe type config";
            }
        }
        if (writeConfig === undefined) {
            throw "Error Write your config";
        }
        return writeConfig;
    }
}

module.exports = {Config};