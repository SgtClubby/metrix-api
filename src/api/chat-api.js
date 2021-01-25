let chatSocketPort = 3000
const chatws = require('socket.io')(chatSocketPort)

console.log(`Connected to http://localhost:${socketport}. Listening...`)

const users = {}
      
chatws.on('connection', (chat) => {

chat.on('new-user', name => {
    users[chat.id] = name
    chat.broadcast.emit('user-connected', name)
})

chat.on('send-chat-message', async (message) => {
    chat.broadcast.emit('chat-message', { message: message, name: users[chat.id] })  
})

chat.on('disconnect', () => {
    chat.broadcast.emit('user-disconnected', users[chat.id])
    delete users[chat.id]
    })
})