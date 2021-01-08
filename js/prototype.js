/* prototypes
function Persona (nombre, apellido, edad){
    this.nombre = nombre
    this.apellido = apellido
    this.edad = edad
}

/* al poner esta funcion como arrow function devuelve las propiedades como undefined, 
ya que el arrow reconoce el this como el objeto global del navegador(window) 
por lo q no encontrara las propiedades.
Persona.prototype.saludar = function () {
    console.log(`Hola, mi nombre es ${this.nombre} ${this.apellido} y tengo ${this.edad} años`)
}

/* se deben declarar todas las funciones al inicio del codigo, si no, 
puede dar error(que no reconozca algunas funciones)
let persona1 = new Persona('Sasha','Banks', 25)
let persona2 = new Persona('Alexa','Bliss', 22)
let persona3 = new Persona('Sasha','Grey', 31) */

// Clases

class Persona {
    constructor(nombre, apellido, edad){
        this.nombre = nombre
        this.apellido = apellido
        this.edad = edad
    }

    saludar(fn){
        console.log(`Hola, mi nombre es ${this.nombre} ${this.apellido} y tengo ${this.edad} años`)
        if(fn){
            fn(this.nombre, this.apellido, false)
        }
    }

    mayorEdad(){
        return this.edad>=18
    }
}

class Futbolista extends Persona{
    constructor(nombre, apellido, edad, equipo){
        super(nombre, apellido, edad)
        this.equipo = equipo
    }

    saludar(fn){
        console.log(`Hola, mi nombre es ${this.nombre} ${this.apellido}, 
            tengo ${this.edad} años y juego en el ${this.equipo}`)
        if(fn){
            fn(this.nombre, this.apellido, true)
        }
    }
}

function responderSaludo(nombre, apellido, isPro){
    console.log(`Como te va, ${nombre} ${apellido}?`)
    if (isPro){
        console.log(`Llegaras muy lejos`)
    }

}
let persona1 = new Persona('Sasha','Banks', 17)
let futbolista1 = new Futbolista('Carmelo','Valencia', 35, 'Junior')

persona1.saludar(responderSaludo)
futbolista1.saludar(responderSaludo)