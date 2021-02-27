import React from 'react'
import { toHourMonth } from '../helpers/hourMonth'

export const OutgoingMessage = ({ message }) => {
    return (
        <div className="outgoing_msg">
            <div className="sent_msg">
                <p>{ message.message }</p>
                <span className="time_date">{ toHourMonth(message.createdAt) }</span>
            </div>
        </div>
    )
}
