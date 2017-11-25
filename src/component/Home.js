import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import ContentEditable from 'react-contenteditable'
import axios from 'axios'

import {actorRequest, loadingRequest} from '../action/action'
import ChatUser from './chat/ChatUser'
import ChatBot from './chat/ChatBot'
import {LoadingAnim} from './section/index'

const STATUS_USER = 0
const STATUS_BOT = 1

class Home extends Component {

    constructor() {
        super()
        this.state = {
            user_name: "",
            message_input: "",
            message_histories: [],
            is_histories_loaded: false
        }
    }

    componentDidMount() {
        this.loadUser()
        this.loadHistory()
    }

    loadUser = () => {
        const {dispatcherRequest} = this.props
        axios.get(`/api/v1/user/profile`, {
            validateStatus: (status) => {
                return status === 200
            }
        }).then((res) => {
            this.setState({user_name: res.data.data.name})
        }).catch((err) => {
            dispatcherRequest(true, 401, 'Failed to get user name')
        })
    }

    loadHistory = (id) => {
        const {dispatcherRequest} = this.props

        let url = `/api/v1/bot`
        if (typeof(id) === 'number') {
            url = url + '?id=' + id
        }

        axios.get(url, {
            validateStatus: (status) => {
                return status === 200
            }
        }).then((res) => {
            res.data.data.map((val) => this.dispatchMessage(val))
            this.setState({is_histories_loaded: true})
            this.scrollBottom()
        }).catch((err) => {
            dispatcherRequest(true, 401, 'Failed to get message history')
        })
    }

    dispatchMessage = (data) => {
        const {message, status, time} = data
        const message_histories = this.state.message_histories
        if (status !== STATUS_USER && status !== STATUS_BOT) {
            return
        }
        message_histories.push({
            message: message,
            status: status,
            time: new Date(time * 1000).toLocaleString()
        })
        this.setState({message_histories: message_histories})
    }

    handleMessageInput = (e) => {
        this.setState({message_input: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()

        if (!this.state.is_histories_loaded) {
            const {dispatcherRequest, is_logged_in} = this.props
            dispatcherRequest(is_logged_in, 401, 'Message has not been loaded')
            return
        }

        const {message_input} = this.state
        if (message_input.length < 1) {
            return
        }
        
        let formData = new FormData()
        formData.append('text', message_input)

        this.dispatchMessage({
            message: {
                id: 1,
                text: message_input
            },
            status: STATUS_USER,
            time: Math.floor(Date.now() / 1000)
        })

        this.setState({message_input: ''})
        this.scrollBottom(true)

        axios.post(`/api/v1/bot`, formData, {
            validateStatus: (status) => {
                return status === 200
            }
        })
        .then((res)=>{
            this.dispatchMessage(res.data.data)
            this.scrollBottom(true)
        }).catch(()=>{})
    }

    handleSignOut = (e) => {
        e.preventDefault()

        const {dispatcherRequest, dispatcherLoading} = this.props
        dispatcherLoading(10, false)

        axios.post(`/api/v1/user/signout`, {
            validateStatus: (status) => {
                return status === 200
            }
        })
        .then((res)=>{
            dispatcherLoading(100, false)
            dispatcherRequest(false, 0, '')
        }).catch((err)=>{
            dispatcherLoading(10, true)
            dispatcherRequest(true, 401, 'Error connection')
        })
    }

    scrollBottom = (isSmooth) => {
        setTimeout(() => {
            const content = document.getElementById('chat_content')
            if (content) {
                if (typeof(content.scroll) !== 'function') {
                    return
                }
                if (isSmooth) {
                    content.scroll({top: content.scrollHeight, behavior: 'smooth'})
                } else {
                    content.scrollTop = content.scrollHeight
                }
            }
        }, 100)
    }

    render() {
        const {is_logged_in} = this.props
        const content = (
            <div className="_cn">
                <div className="_cn _cn3cl">
                    <header className="_cn center _pd3xl3a _f5c _ch3hdr _he5a">
                        <div className="_cn5n">
                            <i className="fa fa-bars _ic3l5w" aria-hidden="true"></i>
                            {/* sidebar */}
                            <div className="_n _pd _fx5n">
                                <div className="_cn _cn3cl">
                                    {/* sidebar header */}
                                    <div className="_pd3xl3tb _pd3l3lr _f5c _fx5n">
                                        <img className="_i3xlc _ma3m3b" src="../img/logo512.png" alt="logo"/>
                                        <div className="ta5c">
                                            <h3 className="_he3m _ma">gimBot</h3>
                                            <p className="_ct3w _ma">Ask me anything about practicum</p>
                                        </div>
                                    </div>
                                    {/* sidebar content */}
                                    <div className="_cn _cn3cl _ch3cnt"></div>
                                    {/* sidebar footer */}
                                    <div className="_pd3l3a _ch3ftr">
                                        <Link to={'#'} onClick={this.handleSignOut}>
                                            <div className="_sd5ft">
                                                LOGOUT
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="overlay"></div>
                        <span className="_ma3l3lr">
                            <img className="_i3l _ma" src="../img/logo256.png" alt="logo"/>
                        </span>
                        <div>
                            <p className="_he3m _ma">gimBot</p>
                            <p className="_ct3w">Ask me anything about practicum</p>
                        </div>
                    </header>
                    {/* content */}
                    {!this.state.is_histories_loaded
                        ? (
                            <div className="_cn _f5c" style={{background: 'aliceblue'}}>
                                <div className="_bl5d _pd3l3a">
                                    <LoadingAnim/>
                                </div>
                            </div>
                        )
                        : (
                            <div
                                id="chat_content"
                                className="_cn _cn3cl _ch3cnt"
                                style={{
                                backgroundColor: 'aliceblue'
                            }}>
                                <div className="_ch3pn _emt"></div>
                                <div className="_ch3pn">
                                    {/* chatting container */}
                                    {this
                                        .state
                                        .message_histories
                                        .map((val, i) => {
                                            return val.status === STATUS_USER
                                                ? (<ChatUser
                                                    key={i}
                                                    username={this.state.user_name}
                                                    message={val.message.text}
                                                    time={val.time}/>)
                                                : (<ChatBot key={i} user_name="gimBot" message={val.message} time={val.time}/>)
                                        })}
                                </div>
                            </div>
                        )}

                    {/* footer */}
                    <footer className="_ch3ftr">
                        <div className="_cn flex-end _ch3bd">
                            <ContentEditable
                                id="message_input"
                                className="_ch3m"
                                html={this.state.message_input}
                                tabIndex="0"
                                aria-expanded="false"
                                onChange={this.handleMessageInput}
                                onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    return this.handleSubmit(e)
                                }
                            }}/>
                            <span id="__ch3sb" className="_ma3m3l" onClick={this.handleSubmit}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24">
                                    <path
                                        fill="#bbbbbb"
                                        fillOpacity=".9"
                                        d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path>
                                </svg>
                            </span>
                        </div>
                    </footer>
                </div>
            </div>
        )
        return (is_logged_in
            ? content
            : <Redirect to={'/login'}/>)
    }
}
const mapStatetoProps = (state) => {
    return {is_logged_in: state.is_logged_in, modules_access: state.modules_access}
}
const mapDispatchtoProps = (dispatch) => {
    return {
        dispatcherRequest: (is_logged_in, request_status, error_message) => dispatch(actorRequest(is_logged_in, request_status, error_message)),
        dispatcherLoading: (progress, error) => dispatch(loadingRequest(progress, error))
    }
}
export default connect(mapStatetoProps, mapDispatchtoProps)(Home)
