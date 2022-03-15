import React from 'react'
import './Notifications.css'

export default function Notifications({ notifications }) {
    function notificationToDiv(notification) {
        return (
            <div>{notification}</div>
        );
    }

    function notificationsToDivs() {
        return notifications.map(notification => notificationToDiv(notification));
    }

    return (
        <div className='notifications'>
            <div className='center-me'>
                {notificationsToDivs()}
            </div>
        </div>
    )
}
