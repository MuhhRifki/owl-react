const initialState = {
    is_logged_in: false,
    is_loading: true,
    progress: 0,
    error: false,
    request_status: 0,
    error_message: ''
}

const Reducers = (state = {
    ...initialState
}, action) => {
    switch (action.type) {
        case "INIT":
            return Object.assign({}, state, {is_loading: false, is_logged_in: action.is_logged_in})
        case "REQUEST":
            return Object.assign({}, state, {is_logged_in: action.is_logged_in, request_status: action.request_status, error_message: action.error_message})
        case "LOADING":
            return Object.assign({}, state, {progress: action.progress, error: action.error})
        default:
            return state
    }
}

export default Reducers