import React, { useContext } from 'react'
import { ChatContext } from '../context/chat/ChatContext';
import { fetchWithToken } from '../helpers/fetch';
import { scrollToBottom } from '../helpers/scrollToBottom';
import { types } from '../types/types';

export const SideBarChatItem = ({ user }) => {

    const { chatState, dispatch } = useContext(ChatContext);

    const onOpenChat = async () => {
        dispatch({
            type: types.activateChat,
            payload: user.uid,
        });
        const resp = await fetchWithToken(`messages/${ user.uid }`);
        console.log(resp);
        dispatch({
            type: types.loadChat,
            payload: resp.messages,
        });
        scrollToBottom('messages');
    };

    return (
        <div 
            className={`chat_list ${ (user.uid === chatState.activeChat) && 'active_chat' }`}
            onClick={onOpenChat}
        >
            <div className="chat_people">
                <div className="chat_img">
                    <img src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png" alt="sunil" />
                </div>
                <div className="chat_ib">
                    <h5>{ user.name }</h5>
                    {
                        user.online 
                            ? <span className="text-success">Online</span>
                            : <span className="text-danger">Offline</span>
                    }
                </div>
            </div>
        </div>
    )
}
