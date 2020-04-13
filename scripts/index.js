// Constructor

let body = document.getElementsByName('body');
let btnEstiloClaro = document.getElementById("estiloClaro");
let btnEstiloOscuro = document.getElementById("estiloOscuro");
let btnCrearGuifo = document.getElementById("crearGuifo");
let btnMisGuifos = document.getElementById("btnMisGuifos");
let logo = document.getElementById("logo");

body.onLoad = cambiarCSS();

let menuEstilos = document.getElementById('MenuEstilos');
let btnEstilos = document.getElementById('btnEstilos');
let mostrarMenuEstilos = false;

// Eventos
if(btnEstilos != null){
    btnEstilos.addEventListener('click', () =>{
        if(!mostrarMenuEstilos){
            menuEstilos.style.display = 'block';
            mostrarMenuEstilos = true;
        }else{
            menuEstilos.style.display = 'none';
            mostrarMenuEstilos = false;
        }
    })
}

if(btnEstiloClaro != null){
    btnEstiloClaro.addEventListener("click", () => {
        localStorage.setItem('tema','light');
        cambiarCSS();
    });
    
    btnEstiloOscuro.addEventListener("click", () => {
        localStorage.setItem('tema','dark');
        cambiarCSS();
    });

    btnCrearGuifo.addEventListener("click", ()=>{
        localStorage.setItem('verMisGuifos','false');
        location.href='/video.html';
    })
    btnMisGuifos.addEventListener('click', ()=>{
        localStorage.setItem('verMisGuifos','true');
        location.href='/video.html'
    })
}

// Métodos

  function cambiarCSS() {
    if(localStorage.getItem('tema') == null){
        localStorage.setItem('tema','light');
    }
    let tema = localStorage.getItem('tema');
    var oldlink = document.getElementsByTagName("link").item(1);

    var newlink = document.createElement("link");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", './styles/' + tema + '.css');
    if(btnEstiloClaro != null){
        if(tema == 'light'){
            btnEstiloClaro.innerHTML = '<u>S</u>ailor Day';
            btnEstiloOscuro.innerHTML = 'Sailor Night'; 
            logo.src = 'images/gifOF_logo.png'
        }else{
            btnEstiloClaro.innerHTML = 'Sailor Day';
            btnEstiloOscuro.innerHTML = '<u>S</u>ailor Night';
            logo.src = 'images/gifOF_logo_dark.png';
        }
    }

    if(tema == 'light'){
        logo.src = 'images/gifOF_logo.png'
    }else{
        logo.src = 'images/gifOF_logo_dark.png';
    }

    document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
}