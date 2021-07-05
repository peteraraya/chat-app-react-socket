import React, { useContext, useEffect, createContext } from 'react';
// Context
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';
import { scrollToBottomAnimated } from '../helpers/scrollToBottom';
// Sockets
import { useSocket } from '../hooks/useSocket'
// types
import {types} from '../types/types';

export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {

  const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:8080');
  const { auth } = useContext( AuthContext );
  const { dispatch } = useContext( ChatContext );

  

  useEffect(() => {
    if (auth.logged) {
      conectarSocket();
    }
  }, [auth, conectarSocket])

  useEffect(() => {
    if (!auth.logged) {
      desconectarSocket();
    }
  }, [auth, desconectarSocket])

  // Escuchar los cambios en los usuarios conectados
  useEffect(() => {

    socket?.on('lista-usuarios', (usuarios)=>{
      dispatch({
        type: types.usuariosCargados ,
        payload:usuarios
      });
    });

  }, [dispatch, socket])


  useEffect(() => {
    socket?.on('mensaje-personal', (mensaje)=>{
 
      // dispatch de una acción
      dispatch({
        type: types.nuevoMensaje,
        payload:mensaje
      });
      // TODO: mover el scroll al final
      scrollToBottomAnimated('mensajes');
    });
  }, [socket, dispatch])

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  )
}