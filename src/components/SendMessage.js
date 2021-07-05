import React, { useContext, useState } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';
import { SocketContext } from '../context/socketContext';

export const SendMessage = () => {

  const [ mensaje, setMensaje] = useState('');
  const { socket }    = useContext(SocketContext);
  const { auth }      = useContext(AuthContext);
  const { chatState } = useContext(ChatContext);

  // Obtenemos el socket


  const onChange = ({target}) => {
   setMensaje( target.value );
  }

  const onSubmit = (ev) => {
    ev.preventDefault();

    // validacion
    if (mensaje.length === 0) {
        return;
    }
    // Limpieza del input
    setMensaje('');


    // TODO: emitir un evento de sockets para enviar el mensaje
    /** importante
     * 
     * {
     *    de:   uid del usuario enviando el mensaje
     *    para: uid del usuario que recibe el mensaje
     *    menesjae : es lo que quiero enviar
     * 
     * }
     */
      socket.emit('mensaje-personal',{
        de: auth.uid,
        para: chatState.chatActivo,
        mensaje
      });

     /* 
     * // TODO: hacer el dispatch del el mensaje
     * 
    */


  }

  return (
    <form 
        onSubmit={ onSubmit }
    >
      <div className="type_msg row">
        <div className="input_msg_write col-sm-9">
          <input 
                type="text" 
                className="write_msg" 
                placeholder="Mensaje..."
                value={ mensaje }
                onChange={ onChange }
                />
        </div>
        <div className="col-sm-3 text-center">
          <button 
                className="msg_send_btn mt-3" 
                type="submit"
                >
            enviar
          </button>
        </div>
      </div>
    </form>
  )
}
