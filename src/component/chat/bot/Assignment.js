import React from 'react'
import {Link} from 'react-router-dom'

const Assignment = props => {
    const {
        user_name,
        assignments,
        text,
        time
    } = props

    return (
        <div className="_c5m312 _c5x312 _ma3l3t _ma3m3b">
            <h2 className="_he3sb">{user_name}</h2>
            <div className="_ch3a">
                <p className="_ma">{text}</p>
            </div>
            {
                assignments.map((val, i) => {
                    const dt = new Date(val.due_date * 1000).toDateString()
                    return (
                        <div key={i} className="_ch3g _c5m33 _c5x312">
                            <h4>{val.course_name}</h4>
                            <h6>{dt}</h6>
                            <h5>{val.description}</h5>
                            <Link to={'/assignment/' + val.id}><h3>Lihat detail</h3></Link>
                        </div>
                    )
                })
            }
            <p className="_he3s _pd _c5x312">{time}</p>
        </div>
    )
}

export default Assignment
