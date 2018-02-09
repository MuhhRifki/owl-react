import 'core-js/es6/map'
import 'core-js/es6/set'

import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'

import {actorRequest, loadingRequest} from '../action/action'
import {InputContent} from './section/index'

class Login extends Component {
    constructor() {
        super()

        this.state = {
            email: '',
            password: '',
            password_is_show: false
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
            : <Redirect to={`/bot/chat`}/>)
    }

    renderMain = () => {
        return (
            <div className="_cn _f5c">
                <div className="_bl5d _pd3l3a">
                    <form onSubmit={this.handleSignIn}>
                        <div className="_ro">
                            <div className="_c5m38 _c5x312">
                                <h2 className="_he">Masuk</h2>
                                <div className="_ln5w">
                                    <h2 className="_he">ke Owl Assistant</h2>
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
                                    value={this.state.email}/>
                            </div>
                            <div className="_c5m312 _c5x312">
                                <div className="_cn5g _ma3l3b">
                                    <InputContent
                                        id="password"
                                        type={
                                            this.state.password_is_show ? 'text' : 'password'
                                        }
                                        placeholder="Kata sandi"
                                        classname="_ct3w"
                                        autocomplete="off"
                                        spellCheck="false"
                                        onChangeState={this.handleChange}
                                        value={this.state.password}/>
                                    <i className="fa fa-eye" onClick={this.handleDisplayPassword}></i>
                                </div>
                            </div>
                            <div className="_c5m312 _c5x312">
                                <p className="_ct3w inline">
                                    {'Lupa sandi? '}
                                    <b>
                                        <a href="/forgot" className="_ct3w">klik di sini</a>
                                    </b>
                                </p>
                                <button className="_bt5m3w _pl5r _ma _mx3s" type="submit">Masuk</button>
                            </div>
                            <div className="_c5m312 _c5x312">
                                <img className="_ic3l5l" src="../img/logo.png" alt="logo"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    handleSignIn = (e) => {
        e.preventDefault()
        const {dispatcherRequest, dispatcherLoading} = this.props
        const {email, password} = this.state
        dispatcherLoading(10, false)

        if (email.length < 10 || password.length < 6) {
            dispatcherLoading(0, true)
            dispatcherRequest(false, 401, 'Email atau kata sandi salah')
            return
        }

        let formData = new FormData()
        formData.append('email', this.state.email)
        formData.append('password', this.state.password)

        axios.post(`/api/v1/user/signin`, formData, {
            validateStatus: (status) => {
                return status < 500
            }
        })
        .then((res)=>{
            if (res.status === 200) {
                dispatcherLoading(100, false)
                dispatcherRequest(true, 200, '')
            } else {
                dispatcherLoading(10, true)
                dispatcherRequest(false, 401, 'Email atau kata sandi salah')
            }
        }).catch((err)=>{
            dispatcherLoading(10, true)
            dispatcherRequest(false, 401, 'Kesalahan sambungan')
        })
    }

    handleDisplayPassword = (e) => {
        this.setState({password_is_show: !this.state.password_is_show})
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
        dispatcherRequest: (is_logged_in, request_status, error_message) => dispatch(actorRequest(is_logged_in, request_status, error_message)),
        dispatcherLoading: (progress, error) => dispatch(loadingRequest(progress, error))
    }
}
export default connect(mapStatetoProps, mapDispatchtoProps)(Login)
