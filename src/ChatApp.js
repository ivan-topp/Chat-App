import React from 'react'
import { AuthProvider } from './auth/AuthContext'
import { ChaProvider } from './context/chat/ChatContext'
import { SocketProvider } from './context/SocketContext'
import { AppRouter } from './router/AppRouter'
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');


export const ChatApp = () => {
    return (
        <ChaProvider>
            <AuthProvider>
                <SocketProvider>
                    <AppRouter />
                </SocketProvider>
            </AuthProvider>
        </ChaProvider>
    )
}
