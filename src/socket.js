import {io} from 'socket.io-client'
import Cookies from 'js-cookie';
export const socket = io('http://localhost:3000', {
  auth: { token: Cookies.get('token') },
  autoConnect: false,
});