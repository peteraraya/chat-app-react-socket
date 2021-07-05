import { useCallback, useEffect, useState } from 'react';
import io from 'socket.io-client';


export const useSocket = (serverPath) => {

  // const socket = useMemo(() => io.connect(serverPath, { transports: ['websocket'] }), [serverPath]);

  const [socket, setSocket] = useState(null);

  const [online, setOnline] = useState(false);

  // Funciones necesarias para detectar sockets

  const conectarSocket = useCallback(
    () =>{

      const token = localStorage.getItem('token');

      const socketTemp = io.connect(serverPath, 
          { 
            transports: ['websocket'], 
            autoConnect: true, /** importante para que se mantenga siempre conectado */
            forceNew: true,    /** importante para no use la conexión anterior */
            query:{
              'x-token':token
            }
          }
        );

        setSocket(socketTemp);

    },[serverPath]);

  const desconectarSocket = useCallback(
    () =>{
          // si el socket existe lo desconecto
          socket?.disconnect();

    },[socket]);

  useEffect(() => {
    setOnline(socket?.connected);
  }, [socket])

  useEffect(() => {
    socket?.on('connect', () => setOnline(true));
  }, [socket])

  useEffect(() => {
    socket?.on('disconnect', () => setOnline(false));
  }, [socket])

  return {
    socket,
    online,
    conectarSocket,
    desconectarSocket,
  }
}