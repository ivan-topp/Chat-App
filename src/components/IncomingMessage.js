import React from 'react'
import { toHourMonth } from '../helpers/hourMonth'

export const IncomingMessage = ({ message }) => {
    return (
        <div className="incoming_msg">
            <div className="incoming_msg_img">
                <img src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png" alt="sunil" />
            </div>
            <div className="received_msg">
                <div className="received_withd_msg">
                    <p>{ message.message }</p>
                    <span className="time_date">{ toHourMonth(message.createdAt) }</span>
                </div>
            </div>
        </div>
    )
}
