
import { createContext, useReducer } from 'react';
import { chatReducer } from './chatReducer';


export const ChatContext = createContext();

const initialState =  {
  uid: '',
  chatActivo:null, // UID del usuario al que yo quiero enviar mensajes
  usuarios:[],     // Todo los usuarios de la base de datos
  mensajes:[],     // el chat seleccionado
}


export const ChatProvider = ({children}) => {

  const [chatState, dispatch] = useReducer(chatReducer , initialState)


    return (
      <ChatContext.Provider value={{
        chatState,
        dispatch
      }}>
        { children }
      </ChatContext.Provider>
    )
}


/**
 * dispatch : es una función en la que yo voy a disparar las acciones que van a ser recibidas en mi reducer y 
 *            este generara un nuevo state
*/