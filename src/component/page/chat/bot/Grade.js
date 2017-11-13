import React from 'react'

const Grade = props => {
    const {
        user_name,
        grades,
        time
    } = props

    return (
        <div className="_c5m312 _c5x312 _ma3l3t">
            <h2 className="_he3sb">{user_name}</h2>
            <div className="_ch3a">
                <p className="_he3s">here it is!</p>
            </div>
            <table className="_ch3e _ma3m3tb">
                {
                    grades.map(val => {
                        return (
                            <tr>
                                <td>{val.name}</td>
                                <td>{val.value}</td>
                            </tr>
                        )
                    })
                }
            </table>
            <p className="_he3s">{time}</p>
        </div>
    )
}

export default Grade
