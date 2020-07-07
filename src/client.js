const io = require('socket.io-client')
const socket = io.connect('https://voicy-speaker.herokuapp.com/',{reconnection: true})

socket.on('connect', socket =>{
    console.log('Connected');
})