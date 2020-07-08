const buttons = document.querySelectorAll('.menu-item');
const mode = document.querySelector('.mode');
const content = document.querySelector('.content');
const io = require('socket.io-client')
const socket = io.connect('https://voicy-speaker.herokuapp.com/',{reconnection: true})
const mods = [
    'ALL VOICES MODE', 'MICROPHONE MODE', 'STREAM MODE'
]
const linkStory = 'https://voicy-speaker.herokuapp.com/voices'


for(let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener("click",() => {
            buttons.forEach(element => {
                element.className = 'menu-item disable';
            });
            buttons[i].className = 'menu-item enable';
            mode.innerHTML = mods[i];
            content.innerHTML = '';
            switch(i){
                case 0:
                    RunAllVoicesMode();
                    break;
                case 1:
                    RunMicrophoneMode();
                    break;
                case 2:
                    RunStreamMode();
                    break;
                default:
                    alert('Всё очень плохо!')
            }
    })
}

async function RunAllVoicesMode(){
    let request = new XMLHttpRequest();
    request.open('GET', linkStory);
    request.responseType = 'json';
    request.send();
    request.onload = async function(){
        for(let i = 0; i < request.response.length; i++){
            let tempBlob = new Blob([new Uint8Array(request.response[i].audioBlob[0].data).buffer] , {type:'audio'});
            if(tempBlob.size === 0){
                continue;
            }
            const audioUrl = URL.createObjectURL(tempBlob);
            const audio = new Audio(audioUrl);
            let audioHtml = document.createElement('div');

            audioHtml.innerHTML = `<audio controls src=\'${audioUrl}\'></audio>`;
            content.append(audioHtml);
            console.log(tempBlob);
            }
        };
    }


function RunMicrophoneMode(){
    let newHtml = '<button id=\'recorder\' class=\'btn btn-rec\'>Record</button>' +
    '<button id=\'stop\' class=\'btn btn-stop\'>Stop</button>'
    content.innerHTML = newHtml;
    


    // const recorder = document.getElementById('recorder');
    // const stop = document.getElementById('stop');
    // if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //         console.log('getUserMedia supported.');
    //         navigator.mediaDevices.getUserMedia (
    //            {
    //               audio: true
    //            })
    //             .then(function(stream) {
    //             record.onclick = function() {
        //             mediaRecorder.start();
        //             console.log(mediaRecorder.state);
        //             console.log("recorder started");
        //           }
        //        })
        //        .catch(function(err) {
        //           console.log('The following `getUserMedia` error occured: ' + err);
        //        }
        //     );
        //  } else {
        //     console.log('getUserMedia not supported on your browser!');
//         }
//     }
//     stop.onclick = () => {
//         console.log(stop.innerHTML);
//     }
}




function RunStreamMode(){
    socket.on('audioMessage', function (audioChunks) {
        const audioBlob = new Blob(audioChunks);
        console.log(audioBlob);
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        // console.log(audioBlob);
        // console.log(audioUrl);
        // content.innerHTML = `<audio controls src=\'${audioUrl}\'></audio>`;
        audio.play();
    });

}


socket.on('connect', socket =>{
    console.log('Connected');
})



socket.on('user', data =>{
    const onlineUsers = document.getElementById('online-count');
    onlineUsers.innerHTML = data;
}) //В данном случае data - количество подключенных пользователей

socket.on('audioMessage', data =>{
    console.log(data);
}) //при записи голосового, мы получаем data, которая ArrayBuffer, потом можно удалить этот блок

// socket.on('user', function (usercount) {
//     console.log(socket.querySelector('.usercount').text(usercount));
// });


