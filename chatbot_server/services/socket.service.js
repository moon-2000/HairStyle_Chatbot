const {generateResponses} = require('./chatbot.service');


async function extractUserInput(qsm) {
    return new Promise(async (resolve, reject) => {
        resolve(qsm);
    })
}

const connectWebSocket = (io) => {
    io.on('connection', function (socket) {
        socket.on('join', (userId) => {
            socket.join(userId);
            console.log("New user joined!")
        });

        socket.on('new-msg', async function (data) {
            let response = generateResponses(data.msg);
            
            let input = await extractUserInput(data.msg);
            io.to(data.room).emit('send-msg-response', (await response) !== undefined
                ? response : "I didn't quite understand that! Can you please rephrase it? :( ");
        })

    });
}


module.exports = {connectWebSocket}