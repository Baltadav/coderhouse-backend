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

    async getAll(){
        try {
            return await this.db.from(this.tableName).orderBy("id","asc");  
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id){
        try {
            return await this.db.from(this.tableName).where('id', id);
        } catch (error) {
            console.log(error);
        }
    }

    async create(product){
        //product debe ser un array con un objeto
        try{
            return await this.db.from(this.tableName).returning('id').insert(product);
        } catch(error){
            console.log(error);
        }
    }

    async update(id, newProduct){
        //newProduct debe ser un objeto

        try {
            return await this.db.from(this.tableName).where('id', id).update(newProduct).returning("*");
        } catch (error) {
            console.log(error);
        }   
    }

}

module.exports = ProductServiceDB;