import React from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { createStore } from 'redux'
import { initAction } from '../action/action'
import Reducers from '../reducer/index'
import { Loading } from '../component/index'
import axios from 'axios'

class Init extends React.Component {

    componentWillMount() {
        axios.get(`/api/v1/role`).then((res) => {
            if (res.status === 200) {
                if (res.data.data.is_logged_in) {
                    this.props.onInitialize(true)
                    return
                }
            }
            this.props.onInitialize(false)
        })
    }

    render() {
        const { is_loading } = this.props
        return (is_loading ?
            < Loading / >
            :
            this.props.children)
    }
}

Init.propTypes = {
    is_loading: propTypes.bool.isRequired,
    onInitialize: propTypes.func.isRequired
}

const mapStatetoProps = (state) => {
    return {
        is_loading: state.is_loading,
        is_logged_in: state.is_logged_in
    }
}
const mapDispatchtoProps = (dispatch) => {
    return {
        onInitialize: (is_logged_in) => dispatch(initAction(is_logged_in))
    }
}
export const Initialize = connect(mapStatetoProps, mapDispatchtoProps)(Init)
export let store = createStore(Reducers)