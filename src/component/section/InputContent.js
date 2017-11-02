import React from 'react'

const InputContent = props => {
    const {
        id,
        type,
        placeholder,
        classname,
        value,
        autocomplete,
        onChangeState,
    } = props

    const style = {
        outline: 'none'
    } 

    return (
        <div className={classname}>
            <input
                id={id}
                style={style}
                type={type}
                placeholder={placeholder}
                onChange={onChangeState}
                value={value}
                autoComplete={autocomplete}/>
        </div>
    )
}

export default InputContent
