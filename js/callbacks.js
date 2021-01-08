const API_URL = 'https://swapi.dev/api/'
const PEOPLE_URL = 'people/:id'
const options = { crosDomain:true }

const response = function (persona){
    console.log(`Hola, has consumido el servicio de ${persona.name}`)
}

function obtenerPersonaje(id){
    return new Promise((resolve,reject) => {
        const URL = `${API_URL}${PEOPLE_URL.replace(':id', id)}`
        $.get(URL, options, function (data){ 
            resolve(data)
        }).fail(() => reject(id))
    }) 
}

/* las respuestas a los metodos asincronos varian dependiendo de muchos factores
no se puede conocer cual sera el orden de las respuestas de las peticiones */

function onError(id){
    console.log(`Error obteniendo el personaje ${id}`)
}
// promesas anidadas, de esta forma respeta el orden de las peticiones y se ejecutan 1 a 1 sin importar su duracion
/* obtenerPersonaje(1) 
    .then(personaje1 => {
        console.log(`el personaje 1 es ${personaje1.name}`)
        return obtenerPersonaje(2)
    })
    .then(personaje2 => {
        console.log(`el personaje 2 es ${personaje2.name}`)
        return obtenerPersonaje(3)
    })
    .then(personaje3 => {
        console.log(`el personaje 3 es ${personaje3.name}`)
        return obtenerPersonaje(4)
    })
    .then(personaje4 => {
        console.log(`el personaje 4 es ${personaje4.name}`)
    }).catch(onError)  */

async function listaPersonajes (){ //el async es para q sirva await
    let idPersonajes = [1,2,3,4,5,6,7,8,9,10]
    let promesas = idPersonajes.map(id => obtenerPersonaje(id))
    try{
        let personajes = await Promise.all(promesas) //await detiene la ejecucion del codigo hasta que se resuelvan todas las promesas
        console.log(personajes)
    }catch (id){
        onError(id)
    }
}

listaPersonajes ()