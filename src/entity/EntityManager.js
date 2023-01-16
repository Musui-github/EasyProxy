let entities;

let GLOBAL_ID = 100000000;

module.exports = {

    /**
     * Push your entity
     * @param entity {Entity}
     */
    register(entity)
    {
        if(existEntityByID(entity.getID()))return console.debug(`[ENTITY] : ${entity.getName()} is already registered!`);
        entities.push(entity);
    },
    
    /**
     * @param entity {Entity}
     */
    unregister(entity)
    {
        if(!existEntityByID(entity.getID()))return console.debug(`[ENTITY] : ${entity.getName()} is not registered!`);
        entities.pop(entity);
    },

    getAll()
    {
        return entities;
    },

    existEntityByID(id)
    {
        let entity = false;
        entities.forEach(entity_class => {
            if(entity_class.getID() === id) entity=true;
        });
        return entity;
    },

    getEntityByID(id)
    {
        let entity;
        entities.forEach(entity_class => {
            if(entity_class.getID() === id) entity=entity_class;
        });
        return entity;
    },

    getEntityByName(name)
    {
        let entity;
        entities.forEach(entity_class => {
            if(entity_class.getName() === name) entity=entity_class;
        });
        return entity;
    },

    existEntityByName(name)
    {
        let entity = false;
        entities.forEach(entity_class => {
            if(entity_class.getName() === name) entity=true;
        });
        return entity;
    },

    getNextID()
    {
        GLOBAL_ID++;
        return GLOBAL_ID;
    }
}

function existEntityByID(id)
{
    let entity = false;
    entities.forEach(entity_class => {
        if(entity_class.getID() === id) entity=true;
    });
    return entity;
}