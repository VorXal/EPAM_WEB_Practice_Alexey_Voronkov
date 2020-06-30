import './sass/style.sass';


let text = document.getElementById("hello");
text.addEventListener("click", ChangeColor, false);

let hint = document.getElementById("hint");


function ChangeColor(){
    if(text.style.color === 'white')
    {
        text.style.color = 'black';
    }
    else{
        text.style.color = 'white';
    }
    hint.innerText = "LOL ))00))0)))"
}

console.log(hint.innerText);
console.log('Hello!');

