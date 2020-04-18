let apikey = 'mcBjmfLLic6fz7OBERAMdLdAL9PY2zLq';

body.onLoad = cargarGifs();

let searchBox = document.getElementById('buscadorText');
let btnBuscar = document.getElementById('btnBuscar');
let sugerenciasText = document.getElementById('sugerenciasText');
let tendenciasText = document.getElementById('tendenciasText');
let lupa = document.getElementById('lupa');

function cargarGifs(){
    recomendedGif('puppy',1);
    recomendedGif('pixar',2);
    recomendedGif('cat',3);
    recomendedGif('funny',4);
    trendingGifs();
}

function recomendedGif(searchWord, numberGif){    
    const found = fetch("https://api.giphy.com/v1/gifs/search?q=" + searchWord + "&api_key=" + apikey)
        .then(response => {        
            return response.json();
        })
        .then(data => {  
            console.log(data);
            var divGif = document.getElementById('gifR' + numberGif);
            var titleBar = document.createElement('div');
            var backGif = document.createElement('div');
            var btn = document.createElement('button');
            btn.innerHTML = 'Ver Más...';
            btn.classList.add('btnVerMas');
            btn.id = 'btnSearch' + numberGif;

            btn.addEventListener('click', ()=>{
                searchBox.value = searchWord;
                buscarGif();
            })
            titleBar.classList.add('titleBar');
            
            var fragment = document.createDocumentFragment();
            var title = data.data[0].title
            var res = title.split(" ");

            titleBar.innerText = '#' + res.join(' #');
            backGif.style.background = "url('" + data.data[0].images.downsized.url + "') no-repeat center";
            backGif.style.backgroundSize = "cover";
            backGif.style.height = "286px";
            fragment.appendChild(backGif); 
            divGif.append(titleBar);
            divGif.appendChild(fragment);
            divGif.append(btn);


            return data;
        })
        .catch(error => {
            console.log(error);
            return error;
        });
    return found;
}

function trendingGifs(){    
    const found = fetch("https://api.giphy.com/v1/gifs/trending?api_key=" + apikey)
        .then(response => {        
            return response.json();
        })
        .then(data => {  
            console.log(data);

            var window98 = document.createElement('div');
            var titleBar = document.createElement('div');
            var backGif = document.createElement('div');

            window98.classList.add('window98_');
            window98.classList.add('gifb');
            titleBar.classList.add('titleBar');

            for (let i = 0; i < 25; i++) {
                var fragment = document.createDocumentFragment();
                var title = data.data[i].title
                var res = title.split(" ");

                titleBar.innerText = '#' + res.join(' #');
                backGif.style.background = "url('" + data.data[i].images.downsized.url + "') no-repeat center";
                backGif.style.backgroundSize = "cover";
                backGif.style.height = "300px";
                backGif.style.display = 'flex';
                backGif.style.flexGrow = '1';

                //window98.style.width = data.data[i].images.downsized.width + "px";
                fragment.appendChild(backGif);
                window98.appendChild(fragment);
                window98.append(titleBar);

                var newWindow = document.importNode(window98, true);
                if(i == 4 || i == 13 || i == 18){
                    newWindow.style.width = '600px';
                }
                document.getElementById('resultadoBusqueda').append(newWindow);         
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

    sugerenciasText.style.display = 'none';

    tendenciasText.placeholder = 'Búsqueda: ' + search;

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
        
            window98.classList.add('window98_');
            window98.classList.add('gifb');
            titleBar.classList.add('titleBar');

            //var resul = document.getElementById('resultadoBusqueda');
            for (let i = 0; i < 25; i++) {
                var fragment = document.createDocumentFragment();
                var title = data.data[i].title;
                var res = title.split(" ");

                titleBar.innerText = '#' + res.join(' #');
                backGif.style.background = "url('" + data.data[i].images.downsized.url + "') no-repeat center";
                backGif.style.backgroundSize = 'cover';
                backGif.style.height = "300px";
                backGif.style.display = 'flex';
                backGif.style.flexGrow = '1';               

                fragment.appendChild(backGif);
                window98.appendChild(fragment);
                window98.append(titleBar);

                var newWindow = document.importNode(window98, true);
                if(i == 4 || i == 13 || i == 18){
                    newWindow.style.width = '600px';
                }
                document.getElementById('resultadoBusqueda').append(document.importNode(newWindow, true));         
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