import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 3000
});

export default socket;