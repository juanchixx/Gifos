let apikey = 'mcBjmfLLic6fz7OBERAMdLdAL9PY2zLq';

body.onLoad = trendingGifs();

let searchBox = document.getElementById('buscadorText');
let btnBuscar = document.getElementById('btnBuscar');
let lupa = document.getElementById('lupa');

function trendingGifs(){
    //api.giphy.com/v1/gifs/trending	
    const found = fetch("https://api.giphy.com/v1/gifs/trending?api_key=" + apikey)
        .then(response => {        
            return response.json();
        })
        .then(data => {  
            console.log(data);

            var window98 = document.createElement('div');
            var titleBar = document.createElement('div');
            var backGif = document.createElement('div');
    
            window98.append(titleBar);
            //window98.append(backGif);
        
            window98.classList.add('window98');
            window98.classList.add('gifb');
            titleBar.classList.add('titleBar');

            //var resul = document.getElementById('resultadoBusqueda');
            for (let i = 0; i < 25; i++) {
                var fragment = document.createDocumentFragment();
                console.log(data.data[i].title);
                titleBar.innerText = data.data[i].title;
                backGif.style.background = "url('" + data.data[i].images.downsized.url + "') no-repeat center";
                backGif.style.backgroundSize = "cover";
                backGif.style.height = "280px";
                window98.style.width = data.data[i].images.downsized.width + "px";
                fragment.appendChild(backGif);
                window98.appendChild(fragment);
                
                document.getElementById('resultadoBusqueda').append(document.importNode(window98, true));         
                //const element = array[index];                
            }
            
            return data;
        })
        .catch(error => {
            return error;
        });
    return found;
}

function buscarGif(){
    let search = searchBox.value;
    var elem = document.getElementById('resultadoBusqueda');
    elem.innerHTML = '';

    var sugeridos = document.getElementById('sugeridos');
    sugeridos.innerHTML = '';

    const found = fetch("https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + apikey)
        .then(response => {        
            return response.json();
        })
        .then(data => {  
            console.log(data);

            var window98 = document.createElement('div');
            var titleBar = document.createElement('div');
            var backGif = document.createElement('div');
    
            window98.append(titleBar);
            //window98.append(backGif);
        
            window98.classList.add('window98');
            window98.classList.add('gifb');
            titleBar.classList.add('titleBar');

            //var resul = document.getElementById('resultadoBusqueda');
            for (let i = 0; i < 25; i++) {
                var fragment = document.createDocumentFragment();
                console.log(data.data[i].title);
                titleBar.innerText = data.data[i].title;
                backGif.style.background = "url('" + data.data[i].images.downsized.url + "') no-repeat center";
                backGif.style.backgroundSize = "cover";
                backGif.style.height = "280px";
                window98.style.width = data.data[i].images.downsized.width + "px";
                fragment.appendChild(backGif);
                window98.appendChild(fragment);
                
                document.getElementById('resultadoBusqueda').append(document.importNode(window98, true));         
                //const element = array[index];                
            }
            
            return data;
        })
        .catch(error => {
            return error;
        });
    return found;
}

btnBuscar.addEventListener("click", ()=>{
    buscarGif();
})

searchBox.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        buscarGif();
    }
});

let tema = localStorage.getItem('tema');

searchBox.addEventListener("keyup", () =>{
    tema = localStorage.getItem('tema');
    if(searchBox.value != ""){
        btnBuscar.disabled = false;
        if(tema == 'light'){
            lupa.src = 'images/lupa.svg'
        }else{
            lupa.src = 'images/lupa_light.svg'
        }
    }else{
        btnBuscar.disabled = true;        
        if(tema == 'light'){
            lupa.src = 'images/lupa_inactive.svg'
        }else{
            lupa.src = 'images/Combined Shape.svg'
        }
    }
});