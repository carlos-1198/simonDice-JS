const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const NIVEL_MAXIMO = 10

class Juego{
    constructor(){
        this.inicializar()
        this.generarSecuencia()
        this.siguienteNivel()
    }

/*cuando js va a guardar un atributo en una variable
con el mismo nombre, permite hacerlo solo colocando
el nombre de la variable, son equivalentes las expresiones*/
    inicializar(){
        this.elegirColor = this.elegirColor.bind(this)
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.toggleBtnEmpezar()
        this.nivel = 1
        this.colores = {
            celeste: celeste,  
            violeta,          
            naranja,          
            verde,
        }
        /* .bind(this,x,y,s) permite cambiar el contexto(this) de una funcion pero no ejecuta la funcion,
        function.call(this,x,y,s) hace lo mismo q bind pero si ejecuta la funcion, 
        function.apply(this,[x,y,s]) es igual al call pero los parametros diferentes del this se envian en un array */
    }

    toggleBtnEmpezar(){
        if(btnEmpezar.classList.contains("hide")){
            btnEmpezar.classList.remove("hide")
        }else{
            btnEmpezar.classList.add("hide")
        }
    }

    generarSecuencia(){
        this.secuencia = new Array(NIVEL_MAXIMO).fill(0)
        .map(n => Math.floor(Math.random() *4))
    }

    siguienteNivel(){
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }

    iluminarSecuencia(){
        for (let i = 0; i< this.nivel; i++){
            let color = this.numeroAColor(this.secuencia[i])
            setTimeout(() =>  this.iluminarColor(color), 1000 * i)
        }
    }

    iluminarColor(color){
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color),350)
    }

    apagarColor(color){
        this.colores[color].classList.remove('light')
    }

    agregarEventosClick(){
        this.colores.verde.addEventListener('click', this.elegirColor)
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
    }

    elegirColor(ev){
        const color = ev.target.dataset.color // guarda en color cual fue el color al que el usuario le dio click
        const numeroColor = this.colorANumero(color)
        this.iluminarColor(color)
        if(numeroColor === this.secuencia[this.subnivel]){
            this.subnivel++
            if(this.subnivel === this.nivel){
                this.nivel++
                this.eliminarEventosClick()
                if(this.nivel === (NIVEL_MAXIMO + 1)){
                    this.winner()
                }else{
                    //setTimeout(this.siguienteNivel, 1500)
                    this.upgrateLevel(this.subnivel + 1)
                }
            }
        }else{
            this.looser()
        }
    }

    eliminarEventosClick(){
        this.colores.verde.removeEventListener('click', this.elegirColor)
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
    }

    numeroAColor(numero){
        switch(numero){
            case 0:
                return 'verde'
            case 1:
                return 'celeste'
            case 2:
                return 'violeta'
            case 3: 
                return 'naranja'
        }
    }

    colorANumero(color){
        switch(color){
            case 'verde':
                return 0
            case 'celeste':
                return 1
            case 'violeta':
                return 2
            case 'naranja': 
                return 3
        }
    }

    winner(){ //alertas de libreria sweetalert2
        Swal.fire({
            title: "Felicidades!",
            text: "Has ganado el juego",
            icon: "success"
        }).then(() => this.inicializar())
    }

    upgrateLevel(level){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Has subido al nivel ${level}`,
            showConfirmButton: false,
            timer: 1000
          }).then(() => this.siguienteNivel())
    } 

    looser(){
        Swal.fire({
            title: "Has perdido!",
            text: "vuelve a intentarlo",
            icon: "error"
        }).then(() => {
            this.eliminarEventosClick()
            this.inicializar()
        })
    }
}

function empezarJuego(){
    window.juego = new Juego()
}