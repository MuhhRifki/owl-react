import React from 'react'

const Assignment = props => {
    const {
        user_name,
        assignments,
        time
    } = props

    return (
        <div className="_c5m312 _c5x312 _ma3l3t _ma3m3b">
            <h2 className="_he3sb">{user_name}</h2>
            <div className="_ch3a">
                <p className="_he3s">Here it is!</p>
            </div>
            {
                assignments.map(val => {
                    return (
                        <div className="_ch3g _c5m33 _c5x312">
                            <h4>{val.course_name}</h4>
                            <h6>{val.due_date}</h6>
                            <h5>{val.description}</h5>
                            <h3>View More</h3>
                        </div>
                    )
                })
            }
            <p className="_he3s _c5m312">{time}</p>
        </div>
    )
}

export default Assignment
