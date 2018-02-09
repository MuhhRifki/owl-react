import React from 'react'

const Assistant = props => {
    const {
        user_name,
        assistants,
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
            <div className="_ch5w _cn" style={{clear:"left"}}>
                {
                    assistants.map((val, i) => {
                        return (
                            <div key={i} className="_ch3c _fx5mx">
                                <img className="_i3as5l" alt={val.name} src={val.image} />
                                <div className="_bio">
                                    <span>Nama: {val.name}</span>
                                    <span>Telepon: {val.phone}</span>
                                    <span>ID Line: {val.line_id}</span>
                                    <span>Mata Kuliah:
                                        <ul className="_pd3l3l _ma">{val.courses.map((vals, j) => <li key={j}>{vals}</li>)}</ul>
                                    </span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <p className="_he3s _c5m312">{time}</p>
        </div>
    )
}

export default Assistant
