const io = require('socket.io')();
const userService = require("../services/user.service");
const AlarmService = require("../services/alarm.service");

module.exports = server => {
    io.attach(server);
    io.origins('*:*');
    io.use((socket, next) => {
        console.log(socket.handshake.query.token);
        if(socket.handshake.query.token) {
            const base64Credentials = socket.handshake.query.token;
            const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
            const [username, password] = credentials.split(':');
            const user = userService.authenticate({ username, password });
            if (user) {
                next();
            }
        
        }
        next(new Error('Authentication error'));
    })
    io.on('connection', (client) => {
        console.log(`Client  ${client.id} connected.`);
        client.emit('info', {message: `You are  ${client.id} connected.`});

        client.on('join', function(data) {
            console.log(data);
        });
    
        client.on('message', function(data) {
            AlarmService.saveAlarm(data);
            client.emit('info', {message: "Alert! New message pushed"});
        });

        client.on('disconnect', () =>{
            console.log(`Client ${client.id} disconnected.`);
            client.broadcast.emit('info', {message: `Client ${client.id} disconnected.`});
        });

        client.on('error', function (err) {
            console.log('received error from client:', client.id)
            console.log(err)
        })
    });
}