class ProductServiceDB{
    constructor(db, tableName){
        this.db = db;
        this.tableName = tableName;

        (async()=>{
            try {
                let exists = await this.db.schema.hasTable(this.tableName)    
                if (!exists){
                    await this.db.schema.createTable(this.tableName, table =>{
                        table.increments("id").primary();
                        table.string("title");
                        table.integer("price");
                        table.string("thumbnail");
                    });
                    console.log(`Tabla ${this.tableName} creada!`);
                }else{
                    console.log(`La tabla ${this.tableName} ya existe!`);
                }
            } catch (error) {
                console.log(error)
            }
        })(); 
    }
}

module.exports = ProductServiceDB;