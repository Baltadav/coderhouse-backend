const fs = require('fs');

class Contenedor{
    constructor(file_name = '') {
        this.file_name = file_name;
        this.newId = 1;
    }
    
    async save(newRegister = {}){
    // Recibe un objeto, lo guarda en el archivo, devuelve el id asignado. 
        try{
            const file = await fs.promises.readFile(this.file_name, 'utf-8');
            const records = JSON.parse(file);
            const id = this.getMaxId(records);
            newRegister = {id, ...newRegister};
            records.push(newRegister);
            //console.log(`Id asignado: ${id}`)
            await fs.writeFile(this.file_name,JSON.stringify(records,null,2), err=>{
                if(err) console.log(err);
            })
            //console.log(records)
            console.log(id);
        } catch (error) {
            console.log(error);
        }
    }
    
    getMaxId(data){
        //Busca el id mas alto
            let id = 1;
            for (let reg in data){
                if (reg.id > id){
                    id = reg.id
                }
                id++
            };
        return id;
    }

    async getById(id){
    //Recibe un id y devuelve el objeto con ese id, o null si no existe   
        let result      
        try {
            const file = await fs.promises.readFile(this.file_name, 'utf-8')
            const records = JSON.parse(file)
            const record = records.find(element => parseInt(element.id) === parseInt(id));
            if (!record) return console.log('No hay registros con ese Id') 
            console.log(record) 
        } catch (error) {
            console.log(error)
        }
    }

    getAll(){
    //Devuelve un array con los objetos presentes en el archivo
        fs.promises.readFile(this.file_name, 'utf-8')
        .then(res =>{
            //console.log(res)
            const arr = JSON.parse(res)
            console.log(arr)
        }).catch(err =>{
            console.log(err)
        })
        
    }

    async deleteById(id){
    //Elimina del archivo el objeto con el id buscado
        try {
            const file = await fs.promises.readFile(this.file_name, 'utf-8')
            const records = JSON.parse(file)
            const record = records.find(element => parseInt(element.id) === parseInt(id));
            if (!record) return console.log('No hay registros con ese Id') 
            
            const new_records = records.filter(( obj ) =>{
                return obj.id !== id;
            });
            fs.writeFile(this.file_name,JSON.stringify(new_records,null,2), err=>{
                if(err) console.log(err)
            }) 
        } catch (error) {
            console.log(error)
        }
    }

    deleteAll(){
    //Elimina todos los objetos presentes en el archivo
        try{
            fs.promises.writeFile(this.file_name, '[]')
            console.log('Registros eliminados')
        }catch(err){
            console.log(err)
        }
    }
}
const reg = {
    title: 'El regreso del hola',
    price: 'qweqwe',
    thumpnail: 'Lugones'
}

const text = new Contenedor('./productoss.text')
