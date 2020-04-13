//#region Constructor

let video = document.getElementById('video');
let btnComenzar = document.getElementById('btnComenzar');
let btnCancelar = document.getElementById('btnCancelar');
let btnRecord = document.getElementById('btnRecord');
let _btnRecord = document.getElementById('_btnRecord'); //div que contiene boton
let _btnRecording = document.getElementById('_btnRecording'); //div que contiene boton
let btnListo = document.getElementById('btnListo');
let btnSubir = document.getElementById('btnSubir');
let btnRepetir = document.getElementById('btnRepetir');
let btnCopyLink = document.getElementById('btnCopyLink');
let btnDownloadGif = document.getElementById('btnDownloadGif');
let btnFinish = document.getElementById('btnFinish');
let videoContainer = document.getElementById('videoContainer');
let msgWindow = document.getElementById('msgWindow');
let videoWindow = document.getElementById('videoWindow');
let previewGifWindow = document.getElementById('previewGifWindow');
let uploadingWindow = document.getElementById('uploadingWindow');
let finishedWindow = document.getElementById('finishedWindow');
let arrowVolver = document.getElementById('arrowVolver');
let previewGif = document.getElementById('previewGif');
let gifSubido = document.getElementById('gifSubido');
let clipboardGif;
let urlBlob;
var stream;
var recorder;
var form;
var array = [];
var Gifos=[];

let apikey = 'mcBjmfLLic6fz7OBERAMdLdAL9PY2zLq';

var constraints = {
    audio: false,
    video: {      
      height: { max: 480 }    
    }
};

if(localStorage.getItem('verMisGuifos') == null){
    localStorage.setItem('verMisGuifos','false');
}

if(localStorage.getItem('verMisGuifos') == 'true') {
    videoContainer.style.display = 'none';
    createMisGuifos();
}

videoWindow.style.display = 
previewGifWindow.style.display =
uploadingWindow.style.display = 
finishedWindow.style.display = 'none';

//#endregion
//#region Eventos
arrowVolver.addEventListener('click', ()=>{
    location.href='/';
})

btnCancelar.addEventListener('click', ()=>{
    location.href='/';
})

btnFinish.addEventListener('click', ()=>{
    location.href='/';
})

// PREPARA CÁMARA

btnComenzar.addEventListener('click', ()=>{
    comenzar();    
})

// GRABANDO

btnRecord.addEventListener('click', ()=>{    
    grabando();
})

// PREVIEW GIF

btnListo.addEventListener('click', ()=>{
    prevGif();
});

btnRepetir.addEventListener('click',()=>{
    comenzar();
})

// SUBIENDO GIF

btnSubir.addEventListener('click', ()=>{
    loading();
})

// GIF SUBIDO

btnCopyLink.addEventListener('click', ()=>{
    navigator.clipboard.writeText(clipboardGif);
})

btnDownloadGif.addEventListener('click', ()=>{
    location.href= urlBlob;
})

//#endregion
//#region Metodos
function comenzar(){
    msgWindow.style.display = 
    _btnRecording.style.display = 
    previewGifWindow.style.display = 'none'
    _btnRecord.style.display = 
    videoWindow.style.display = 'flex';
    videoWindow.classList.add('flexColumn');
    getStreamAndRecord();
}
function grabando(){
    _btnRecord.style.display = 'none';
    _btnRecording.style.display = 'flex';
    recorder = RecordRTC(stream, {
        type: 'gif',
        framerate: 30,
        bitrate: 128000,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: function(){
            console.log('started');
        }
    });
    recorder.startRecording();
}
function prevGif(){
    stream.getTracks().forEach(function(track) {
        track.stop();
      });
    recorder.stopRecording();

    videoWindow.style.display = 'none';
    previewGifWindow.style.display = 'block';

    form = new FormData();
    let blobRecord = recorder.getBlob();
    form.append('file', blobRecord, 'myGif.gif');
    urlBlob = URL.createObjectURL(blobRecord);

    previewGif.src = urlBlob;
}

function getStreamAndRecord(){
    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(mediaStream) {  
        video.srcObject = mediaStream;
        stream = mediaStream;
        video.onloadedmetadata = function(e) {
            video.play();
        };
    })
}

function loading(){
    previewGifWindow.style.display = 'none';
    uploadingWindow.style.display = 'flex';
    uploadVideo();
}

function uploadVideo(){
    fetch("https://upload.giphy.com/v1/gifs?api_key=" + apikey , {
        method: 'POST',
        body: form        
    })
    .then(response => {        
        return response.json();
    })
    .then(data => {
        uploadingWindow.style.display = 'none';
        finishedWindow.style.display = 'block';

        var id = data.data.id;
        fetch("https://api.giphy.com/v1/gifs/" + id + "?&api_key=" + apikey)
        .then(response => {
            return response.json();
        })
        .then(data =>{
            gifSubido.src = data.data.images.downsized.url;
            clipboardGif = data.data.bitly_url;  
            
            if (localStorage.getItem("guifos")==null){
                Gifos.push(data);
                localStorage.setItem("guifos", JSON.stringify(Gifos));
              }else{
                Gifos = JSON.parse(localStorage.getItem("guifos"));
                Gifos.push(data);
                localStorage.setItem("guifos", JSON.stringify(Gifos));
              }
            createMisGuifos();
        })
    })
}

function createMisGuifos(){
    var valor = localStorage.getItem("guifos");
    const data = JSON.parse(valor);
    for (var i = 0; i < data.length; i++) {
      array.push(data[i]);
    }    
    var gifImg = document.createElement('img');

    for (let i = 0; i < array.length; i++) {
        gifImg.src = array[i].data.images.downsized.url;
        
        document.getElementById('resultadoBusqueda').append(document.importNode(gifImg, true));         
    }
    array = [];
  }
//#endregion