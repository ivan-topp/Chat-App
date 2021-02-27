import React, { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { ChatContext } from '../context/chat/ChatContext'
import { IncomingMessage } from './IncomingMessage'
import { OutgoingMessage } from './OutgoingMessage'
import { SendMessage } from './SendMessage'

export const Messages = () => {

    const { chatState } = useContext(ChatContext);
    const { auth } = useContext(AuthContext);

    return (
        <div className="mesgs">
            <div 
                id='messages'
                className="msg_history"
            >
                {
                    chatState.messages.map( message => (
                        (message.to === auth.uid)
                            ? <IncomingMessage key={message._id} message={message} />
                            : <OutgoingMessage key={message._id} message={message} />
                    ))
                }
            </div>
            <SendMessage />
        </div>
    )
}
