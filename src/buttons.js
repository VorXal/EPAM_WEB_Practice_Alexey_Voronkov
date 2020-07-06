const buttons = document.getElementsByClassName("menu-item");
const htmlButtons = document.getElementsByClassName("menu-item-name");
const main = document.getElementsByTagName("main")[0];


for(let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener("click",() => {
        let text = buttons[i].getElementsByClassName("menu-item-name")[0];
        for(let l = 0; l < htmlButtons.length; l++){
            htmlButtons[l].style.color = "black";
        }
        text.style.color = "#18D47C";
        main.innerText = text.innerText;
    })
}