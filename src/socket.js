import {io} from 'socket.io-client'
import Cookies from 'js-cookie';
export const socket = io('https://backendchatapp-ghen.onrender.com', {
  auth: { token: Cookies.get('token') },
  autoConnect: false,
});