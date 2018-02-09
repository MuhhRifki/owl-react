import React from 'react'

const Grade = props => {
    const {
        user_name,
        grades,
        text,
        time
    } = props

    return (
        <div className="_c5m312 _c5x312 _ma3l3t">
            <h2 className="_he3sb">{user_name}</h2>
            <div className="_ch3a _pl5l">
                <p className="_ma">{text}</p>
            </div>
            <table className="_ch3e _ma3m3tb" style={{clear:"left"}}>
                <tbody>
                {
                    grades.map((val, i) => {
                        return (
                            <tr key={i}>
                                <td>{val.course_name} ({val.name})</td>
                                <td>{val.score}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            <p className="_he3s">{time}</p>
        </div>
    )
}

export default Grade
