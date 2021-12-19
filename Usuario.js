class Usuario {
  constructor(nombre = '', apellido = '', libros = [], mascotas = []) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  getFullName(){
    return `El nombre es ${this.nombre} ${this.apellido}`;
  }

  addMascota(nombreMasc = ''){
    this.mascotas.push(nombreMasc);
  }

  countMascotas(){
    return this.mascotas.length;
  }

  addBook(nombre = '', autor = ''){
    const libro = {
        nombre: nombre,
        autor: autor
    };

    this.libros.push(libro);
  }

  getBookNames(){
    const arr =[];
    
    for (const i in this.libros){
      arr.push(this.libros[i].nombre)
    };
    
    return arr;
  }
}

const elon = new Usuario('Elon', 'Musk')

elon.addMascota('dogecoin')
elon.addBook('El señor de los anillos', 'William Golding')
elon.addBook('Fundacion', 'Isaac Asimov')

console.log(elon.getFullName())
console.log(elon.countMascotas())
console.log(elon.getBookNames())