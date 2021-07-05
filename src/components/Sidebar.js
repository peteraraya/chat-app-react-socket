import { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';
import { SidebarChatItem } from './SidebarChatItem'

export const Sidebar = () => {
  // Utilizar variable global del chatContext
  const { chatState } = useContext(ChatContext);

  const { auth } = useContext( AuthContext );
  const { uid } = auth;

  return (
    <div className="inbox_chat">

      {/* <!-- conversación activa inicio --> */}
      {
        chatState.usuarios
          .filter((usuario) => usuario.uid !== uid ) // evito mostrar mi usuario en el listado
          .map((usuario) => (
          <SidebarChatItem 
              key={usuario.uid} 
              usuario={usuario}
          />
        ))
      }


    
      {/* <!-- Espacio extra para scroll --> */}
      <div className="extra_space"></div>


    </div>
  )
}
