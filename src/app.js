const buttons = document.querySelectorAll('.menu-item');
const main = document.getElementsByTagName("main")[0];

const ALLVOICES = 'ALL VOICES MODE';
const MICROPHONE = 'MICROPHONE MODE';
const SPEAKER = 'SPEAKER MODE';


for(let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener("click",() => {
            buttons.forEach(element => {
                element.className = 'menu-item disable';
            });
            buttons[i].className = 'menu-item enable';
    })
}