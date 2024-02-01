import {io} from 'socket.io-client'
export const socket = io('https://backendchatapp-ghen.onrender.com', {
  withCredentials: true,
  autoConnect: false,
});