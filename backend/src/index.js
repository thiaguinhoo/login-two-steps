import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import socketIo from 'socket.io';

const app = express();
const serverPort = process.env.SERVER_PORT || 3333;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/get-painel', async (req, res) => {
  const { tokenkey } = req.headers;
  if (!tokenkey) {
    return res.json({ error: 'Error' });
  }
  res.json(
    [
      { label: 'Painel 1', value: '1' },
      { label: 'Painel 2', value: '2' }
    ]
  );
})

app.post('/', async (req, res) => {
  const { jwtusername } = req.body;
  if (!jwtusername) {
    return res.json({ error: 'Error' });
  }
  const tokenKey = jwt.sign({ jwtusername }, 'S3cr3t-k3y');
  res.json({ tokenKey });
});

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: '*'
  }
});

io.on('connection', (sk) => {
  sk.emit('message', 'welcome');

  sk.on('enter in room', data => {
    // set room in socket
    sk.room = data.painel;

    // connect in room
    sk.join(data.painel);

    // add user in room
    io.to(data.painel).emit('enter a user', {
      message: 'Welcome'
    });
  })

  sk.on('call password', data => {
    io.to(sk.room).emit('received password', data);
  });
});

server.listen(serverPort, () => console.log(`> Server running`));
