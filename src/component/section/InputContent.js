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
        spellcheck,
    } = props

    return (
        <input
            id={id}
            type={type}
            placeholder={placeholder}
            onChange={onChangeState}
            value={value}
            autoComplete={autocomplete}
            spellCheck={spellcheck}
            className={classname} />
    )
}

export default InputContent
