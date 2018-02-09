import React from 'react'

const Schedule = props => {
    const {
        user_name,
        schedules,
        text,
        time
    } = props

    return (
        <div className="_w100 _pd _ma">
            <div className="_c5m312 _c5x312">
                <h2 className="_he3sb">{user_name}</h2>
                <div className="_ch3a _pl5l">
                    <p className="_ma">{text}</p>
                </div>
            </div>
            <div className="_ch5w _cn _ma3l3b">
                {
                    schedules.map((val, i) => {
                        return (
                            <div key={i} className="_ch3f">
                                <h4>{val.course_name}</h4>
                                <h3>{val.time}</h3>
                                <h6>{val.day}</h6>
                                <h5>{val.place}</h5>
                            </div>
                        )
                    })
                }
            </div>
            <p className="_he3s _c5m312">{time}</p>
        </div>
    )
}

export default Schedule
