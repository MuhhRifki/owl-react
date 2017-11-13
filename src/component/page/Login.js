import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ReactDOM from 'react-dom'

import {actorRequest} from '../../action/action'
import {InputContent} from '../index.js'

class Login extends Component {
    constructor() {
        super()

        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        const target = e.target
        this.setState({
            [target.id]: target.value
        })
    }

    render() {
        const {is_logged_in} = this.props
        return (!is_logged_in
            ? this.renderMain()
            : <Redirect to={`/home`}/>)
    }

    renderMain = () => {
        return (
            <div className="_cn _f5c">
                <div className="_bl5d _pd3l3a">
                    <form onSubmit={this.handleSignIn}>
                        <div className="_ro">
                            <div className="_c5m38 _c5x312">
                                <h2 className="_he">Login</h2>
                                <div className="_ln5w">
                                    <h2 className="_he">for gimBots</h2>
                                </div>
                            </div>
                            <div className="_c5m312 _c5x312">
                                <InputContent
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    classname="_ct3w"
                                    autocomplete="off"
                                    spellCheck="false"
                                    onChangeState={this.handleChange}
                                    value={this.state.email} />
                            </div>
                            <div className="_c5m312 _c5x312">
                                <div className="_cn5g _ma3l3b">
                                    <InputContent
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        classname="_ct3w"
                                        autocomplete="off"
                                        spellCheck="false"
                                        onChangeState={this.handleChange}
                                        value={this.state.password} />
                                    <i className="fa fa-eye" onClick={this.handleDisplayPassword}></i>
                                </div>
                            </div>
                            <div className="_c5m312 _c5x312">
                                <p className="_ct3w inline">
                                    Forgot password? <b><Link to={'/'} className="_ct3w" href="">here</Link></b>
                                </p>
                                <button className="_bt5m3w _pl5r _ma _mx3s" type="submit">Login</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    handleSignIn = (e) => {
        e.preventDefault()
        const {dispatcherRequest} = this.props

        let formData = new FormData()
        formData.append('email', this.state.email)
        formData.append('password', this.state.password)
        fetch('https://meikoapp.herokuapp.com/api/v1/user/signin', {
            method: 'POST',
            credentials: 'include',
            crossDomain: true,
            body: formData
        }).then((res) => {
            return res.json()
        }).then((data) => {
            return (data.code === 200
                ? dispatcherRequest(true, 200, '')
                : dispatcherRequest(false, 401, data.error))
        })
    }

    handleDisplayPassword = (e) => {
        const dom = ReactDOM.findDOMNode(document.getElementById('password'))
        dom.getAttribute('type') === 'password'
            ? dom.setAttribute('type', 'text')
            : dom.setAttribute('type', 'password')
    }
}

Login.PropTypes = {
    is_logged_in: PropTypes.bool.isRequired,
    is_login_failed: PropTypes.bool.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    onSubmitAction: PropTypes.func.isRequired
}

const mapStatetoProps = (state) => {
    return {is_logged_in: state.is_logged_in, request_status: state.request_status, error_message: state.error_message}
}
const mapDispatchtoProps = (dispatch) => {
    return {
        dispatcherRequest: (is_logged_in, request_status, error_message) => dispatch(actorRequest(is_logged_in, request_status, error_message))
    }
}
export default connect(mapStatetoProps, mapDispatchtoProps)(Login)
