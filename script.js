let tela = document.querySelector("#tela")
const conteiner = document.querySelector(".conteiner")
const aplicar = document.querySelector('#aplicar')
const parar = document.querySelector('#parar')
const audio = new Audio("clock-alarm-8761.mp3")
let despertador = false


        // AQUI TEMOS O RELOGIO.

const relogio = ()=>{
    let getHora = new Date()
    let hora = getHora.getHours()<10?"0"+getHora.getHours():getHora.getHours()
    let minuto = getHora.getMinutes()<10?"0"+getHora.getMinutes():getHora.getMinutes()
    let segundo = getHora.getSeconds()<10?"0"+getHora.getSeconds():getHora.getSeconds()
    let timer = hora+":"+minuto+":"+segundo
    tela.innerHTML=timer
}

setInterval(()=>{
    relogio()
},1000)

        // AQUI TEMOSO DESPERTADOR.


const alarme = (horaMarcada) =>{
    let promise = new Promise((res, rej)=>{
        let getHora = new Date()
        let hora = getHora.getHours()<10?"0"+getHora.getHours():getHora.getHours()
        let minuto = getHora.getMinutes()<10?"0"+getHora.getMinutes():getHora.getMinutes()
        let timer = hora+":"+minuto
        if(timer==horaMarcada){
            res ()
        }else if(timer!=horaMarcada){
            rej ()
        }
    })
    return promise
}


const f_contagem = (horaMarcada)=>{

        let contagem = setInterval(()=>{
            alarme(horaMarcada)
            .then((retorno)=>{
                conteiner.classList.add("ativo")
                audio.play()
                despertador = true
            })
            .catch((retorno)=>{
                console.log(despertador);
                if(despertador){
                    audio.play()
                }else if(!despertador){

                }
            })
        },1000)
        parar.addEventListener("click", (evt)=>{
            audio.pause()
            clearInterval(contagem)
            despertador = false
            conteiner.classList.remove("ativo", "contando")
        })
        return contagem


}

aplicar.addEventListener("click", (evt)=>{
    const horaMarcada = document.querySelector("#marcar_hora").value
    conteiner.classList.add("contando")
    f_contagem(horaMarcada)
})





