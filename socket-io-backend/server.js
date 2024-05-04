const express = require('express')
const cors = require('cors')
const http = require('http')
const socketIo = require('socket.io');
const { clear } = require('console');

const app = express();
app.use(cors())
const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

let lastPrice = Math.random() * 100 + 50; // Random starting price between $50 and $150
let day = 0;

// Route handler for the root path
app.get('/', (req, res) => {
    res.send('Welcome to the stock market API!');
});

io.on('connection', (socket) => {

    const interval = setInterval(() => {
        const changePercent = 2 * Math.random();
        let changeAmount = lastPrice * (changePercent / 100);
        changeAmount *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
        lastPrice += changeAmount;

        // Emit updated stock data with an increasing day count
        socket.emit('stockData', { price: lastPrice, day: ++day });
    }, 2000);

    socket.on('disconnect', () => {
        clearInterval(interval);
    });
})

const PORT = 4000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));