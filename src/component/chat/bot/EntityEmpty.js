import React from 'react'

const EntityEmpty = props => {
    const {
        user_name,
        message,
        time
    } = props

    return (
        <div className="_w100 _pd _ma">
            <div className="_c5m312 _c5x312">
                <h2 className="_he3sb">{user_name}</h2>
                <div className="_ch3a">
                    <p className="_ma">{message}</p>
                </div>
            </div>
            <p className="_he3s _c5m312">{time}</p>
        </div>
    )
}

export default EntityEmpty
