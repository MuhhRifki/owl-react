import React from 'react'

const ChatUser = props => {
    const {
        username,
        message,
        time
    } = props

    return (
        <div className="_c5m312 _c5x312 _ma3l3t">
            <h2 className="_he3sb5r">{username}</h2>
            <div className="_ch3b _pl5r">
                <p className="_he3s5r">{message}</p>
            </div>
            <p className="_he3s5r _pl5r _w100 show">{time}</p>
        </div>
    )
}

export default ChatUser
