import React from 'react'

const Information = props => {
    const {
        user_name,
        informations,
        text,
        time
    } = props

    return (
        <div className="_c5m312 _c5x312 _ma3l3t">
            <h2 className="_he3sb">{user_name}</h2>
            <div className="_ch3a">
                <p className="_ma">{text}</p>
            </div>
            <div className="_ch3d _c5m36">
                <header>
                    <h4>Informasi</h4>
                </header>
                {
                    informations.map((val, i) => {
                        return (
                            <div key={i} className="_c5m312 _c5x312 _cn _pd3m3a">
                                <div className="_pd _fx5mn">
                                    <p className="_ct3m">{val.title}</p>
                                    <p className="_ct3x">{val.description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <p className="_he3s">{time}</p>
        </div>
    )
}

export default Information
