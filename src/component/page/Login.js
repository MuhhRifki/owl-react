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
            password: '',
            is_show_password: false
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
            : <Redirect to={`/main`}/>)
    }

    renderMain = () => {
        return (
            <div className="_f5a _c5m312">
                <div className="_bl5d _c5m3o3 _c5m38">
                    <form
                        className="_cn"
                        onSubmit={(e) => {
                            e.preventDefault();
                            this.handlerSignIn(this.props.dispatcherRequest)
                        }}>
                        <div className="_ro">
                            <div className="_c5m38 _c5x312">
                                <h2 className="_he">Login</h2>
                                <div className="_ln5w">
                                    <h2 className="_he">for gimBot</h2>
                                </div>
                            </div>
                            <div className="_c5x312 _cn5g">
                                <InputContent
                                    classname=""
                                    id="email"
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    autocomplete="off"
                                    value={this.state.email}
                                    onChangeState={this.handleChange}/>
                            </div>
                            <div className="_c5x312 _cn5g">
                                <InputContent
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    autocomplete="off"
                                    value={this.state.password}
                                    onChangeState={this.handleChange}/>
                                    <i onClick={this.onChangeDisplayPassword} className="fa fa-eye"></i>
                            </div>
                            <div className="_c5m33 _c5x36">
                                <p className="_me5t _ct3w">Forgot password?
                                    <b>
                                        <Link to={'/login'}>here</Link>
                                    </b>
                                </p>
                            </div>
                            <div className="_c5m33  _c5x36">
                                <button className="_bt5m3w _pl5r" type="submit">Login</button>
                            </div>
                        </div>
                    </form>

                </div>

            </div>
        );
    }
    handlerSignIn = (dispatcherRequest) => {
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

    onChangeDisplayPassword = () => {
        const password = document.getElementById('password')

        this.state.is_show_password
            ? ReactDOM
                .findDOMNode(password)
                .setAttribute('type', 'password')
            : ReactDOM
                .findDOMNode(password)
                .setAttribute('type', 'text')

        this.setState({
            is_show_password: !this.state.is_show_password
        })
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
