let {db} = require("./index");
let knex = require("knex");

var pg = knex({
    client: "pg",
    connection: {
        ...db
    },
    pool: {min: 0, max: 7}
});

class Database {
    static client;
    constructor(){
        if(Database.client){
           return Database.client;
        }
        Database.client = pg;
        this.client = Database.client;
    }
}

module.exports = new Database().client;