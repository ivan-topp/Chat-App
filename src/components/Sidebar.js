import React, { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';
import { SideBarChatItem } from './SideBarChatItem'

export const Sidebar = () => {

    const { chatState } = useContext(ChatContext);
    const { auth } = useContext(AuthContext);

    return (
        <div className="inbox_chat">
            {
                chatState.users
                    .filter( user => user.uid !== auth.uid)
                    .map( user => (
                    <SideBarChatItem key={ user.uid } user={ user }/>
                    )
                )
            }
            {/*<!-- Espacio extra para scroll -->*/}
            <div className="extra_space"></div>
        </div>

    )
}
