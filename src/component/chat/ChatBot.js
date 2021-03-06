import React from 'react'

import Information from './bot/Information.js'
import Assistant from './bot/Assistant.js'
import Schedule from './bot/Schedule.js'
import Assignment from './bot/Assignment.js'
import Grade from './bot/Grade.js'
import Unknown from './bot/Unknown.js'
import EntityEmpty from './bot/EntityEmpty.js'

const INTENT_ASSISTANT = 'assistant'
const INTENT_INFORMATION = 'information'
const INTENT_SCHEDULE = 'schedule'
const INTENT_ASSIGNMENT = 'assignment'
const INTENT_GRADE = 'grade'
const INTENT_UNKNOWN = 'unknown'

const ChatBot = props => {
    const {
        user_name,
        message: {
            entity,
            message,
            intent
        },
        time
    } = props

    return (
        intent !== INTENT_UNKNOWN && entity.length < 1 ?
            <EntityEmpty
                user_name={user_name}
                message={message}
                time={time}/> :
        intent === INTENT_ASSISTANT ?
            <Assistant
                user_name={user_name}
                assistants={entity}
                message={message}
                time={time}/> :
        intent === INTENT_INFORMATION ?
            <Information
                user_name={user_name}
                informations={entity}
                message={message}
                time={time}/> :
        intent === INTENT_SCHEDULE ?
            <Schedule
                user_name={user_name}
                schedules={entity}
                message={message}
                time={time}/> :
        intent === INTENT_ASSIGNMENT ?
            <Assignment
                user_name={user_name}
                assignments={entity}
                message={message}
                time={time}/> :
        intent === INTENT_GRADE ?
            <Grade
                user_name={user_name}
                grades={entity}
                message={message}
                time={time}/> :
            <Unknown
                user_name={user_name}
                message={message}
                time={time}/>
    )
}

export default ChatBot
