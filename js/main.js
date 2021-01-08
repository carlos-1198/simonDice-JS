var nombre = 'Carlos' 
var apellido = 'Mendoza'
/*punto y coma en js, lineas pegadas = ejm/ 7y8, 9y10, etc...
1.se usa cuando la segunda linea de codigo de dos lineas "pegadas" empieza con un array.
2.cuando la segunda linea de codigo de dos lineas "pegadas" es un template string*/
var nombreCompleto = `${nombre} ${apellido}` //alt + 96 comillas

var nombreEnMayusculas = nombre.toUpperCase()
var apellidoEnMinusculas = apellido.toLowerCase()

var primeraLetraDelNombre = nombre.charAt(0)
var cantidadDeLetrasDelNombre = nombre.length

//primer indice desde q posicion y segundo indice cuantas posiciones va a mostrar
var str = nombre.substr(1,2) 

var ultimaLetra = nombre.charAt(nombre.length-1)

var gomita = 15.6
// valor de 3 gomitas, js es malo con decimales, se usa el .round para evitar errores
var total = Math.round(gomita * 100 * 3)/100
// convierte un decimal a string, entre parentesis cuantos decimales queremos
var totalStr = total.toFixed(3)

function nombreYEdad (nombre, edad ){
	console.log(nombre+" tiene "+edad+" años")
}

//nombreYEdad('Carolina', 18)
//nombreYEdad('Sofia',19)

function nombreMayusculas({nombre}){  // se puede recibir todo el objeto o solo las propiedades necesarias
	console.log(nombre.toUpperCase())
}

//nombreMayusculas("Esperanza")
//nombreMayusculas("Gomez")

// objetos
var persona = {
	nombre: 'Carlos',
	apellido: 'Mendoza',
	edad: 22
}
var persona2 = {
	nombre: 'Sofia',
	apellido: 'Vergara',
	edad: 34
}
var persona3 ={
	nombre: 'Leonel',
	apellido: 'Messi',
	edad: 32
}
var persona4 ={
	nombre: 'Diana',
	apellido: '´Perez',
	edad: 17
}
let personas = [persona,persona2, persona3, persona4]

nombreMayusculas(persona)
nombreMayusculas(persona2)
nombreMayusculas({nombre: 'Jose'}) 

function imprimirNombreYEdad (persona){
	console.log(`hola, mi nombre es ${persona.nombre} y tengo ${persona.edad} años`)
}

imprimirNombreYEdad(persona)
imprimirNombreYEdad(persona2)

function birthday(persona){
	return  {
		...persona,				// copia todo lo q tenia el objeto
		edad: persona.edad + 1
	}
}
OlderPerson = birthday(persona2)

const MAYORIA_DE_EDAD = 18

let esMayorEdad = (persona) => persona.edad >= MAYORIA_DE_EDAD

let permitirAcceso = (persona) => {
	esMayorEdad(persona) ? console.log("puede entrar") : console.log("No puede entrar")
}

permitirAcceso(persona)

let personasMayoresDeEdad = personas.filter(esMayorEdad) // FILTER filtra los datos de un arreglo

/* se recomienda poner el ...arreglo para no sobreescribir el arreglo, de esta 
manera se crea una copia del arreglo con el cambio y el arreglo orignial no se toca */
let fuenteJuventud = (persona) => ({   //colocando las llaves dentro de parentesis no se necesita poner return
	//return {
		...persona,
		edad: persona.edad - 2
	//}	
})

let personasRejuvenecidas = personas.map(fuenteJuventud) // MAP transforma los datos de un arreglo 

const reducer = (total, persona) => total + persona.edad // cuando retorna una operacion elemental se deja sin {} para mejor lectura

let yearsTotal = personas.reduce(reducer,0)

// fechas js

function diasEntreFechas(fecha1, fecha2){
	const msEnDia = 1000 * 60 * 60 * 24 //calcula cuantos ms hay en 1 dia
	const diferenciaFechas = Math.abs(fecha1 - fecha2) // saca la diferencia en ms entre fechas
	return Math.floor(diferenciaFechas / msEnDia) // funcion piso para saber cuantos dias hay entre las fechas
}

const fechaActual = new Date() // new date crea una instancia con la fecha actual
const fechaAEscoger = new Date(1998, 2, 30) // constructor de date recibe año, mes en numero desde 0-11 y dia

// recursividad

function divisionPorRestas(dividiendo, divisor){
	if(dividiendo < divisor){
		return 0
	}else{
		return 1 +(divisionPorRestas(dividiendo-divisor, divisor))
	}
}

// guardar datos en memoria

function factorial(n){
	if (!this.cache){
		this.cache = {}
	}

	if (this.cache[n]){
		return this.cache[n]
	}

	if (n === 1){
		return 1
	}

	this.cache[n] = n * factorial(n-1)
	return this.cache[n]
}

// closure: la funcion del return recuerda el dato que se uso para crearla
function carreraFutbolistica(name){
	return function (newTeam, oldTeam){
		console.log(`${name} jugaba en ${oldTeam}, pero ahora juega en ${newTeam}`)
	}
}

const messi = carreraFutbolistica('Messi') 
const cristiano = carreraFutbolistica('Cristiano R.')
const pedri = carreraFutbolistica('Pedri')

/* al enviarle los parametros de la funcion del return, js es capaz de 
recordar quien lo habia creado */
messi('Barcelona', 'Newls') 
cristiano('Juventus', 'R. Madrid')
pedri('Barcelona', 'Las Palmas')