import {io} from 'socket.io-client'
import Cookies from 'js-cookie';
export const socket = io('http://backendchatapp-production-b4cd.up.railway.app', {
  auth: { token: Cookies.get('token') },
  autoConnect: false,
});