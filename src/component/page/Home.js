import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import ContentEditable from 'react-contenteditable'

import {API_ROOT} from '../../config/api'
import {actorRequest} from '../../action/action'
import ChatUser from './chat/ChatUser'
import ChatBot from './chat/ChatBot'

const STATUS_USER = 0
const STATUS_BOT = 1

class Home extends Component {

    constructor() {
        super()
        this.state = {
            user_name: "",
            message_input: "",
            message_histories: []
        }
    }

    componentDidMount() {
        this.loadUser()
        this.loadHistory()
    }

    loadUser = () => {
        fetch(`${API_ROOT}/api/v1/user/profile`, {
            method: "GET",
            credentials: 'include',
            crossDomain: true
        })
        .then(response => response.json())
        .then((json) => {
            json.code === 200
                ? this.setState({user_name: json.data.name})
                : console.log('err')
        })
    }

    loadHistory = (id) => {
        let url = `${API_ROOT}/api/v1/bot`
        if (typeof(id) === 'number') {
            url = url + '?id=' + id
        }

        fetch(url, {
            method: "GET",
            credentials: 'include',
            crossDomain: true
        })
        .then(response => response.json())
        .then((json) => {
            json.code === 200
                ? json.data.map((val) => this.dispatchMessage(val)) && this.scrollBottom()
                : console.log('err')
        })
    }

    dispatchMessage = (data) => {
        const {message, status, time} = data
        const message_histories = this.state.message_histories
        if (status !== STATUS_USER && status !== STATUS_BOT) {return}
        message_histories.push({message: message, status: status, time: new Date(time).toLocaleString()})
        this.setState({message_histories: message_histories})
    }

    handleMessageInput = (e) => {
        this.setState({message_input: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()

        let formData = new FormData()
        formData.append('text', this.state.message_input)

        this.dispatchMessage({
            message: {
                id: 1,
                text: this.state.message_input,
            },
            status: STATUS_USER,
            time: new Date().toLocaleString()
        })

        this.setState({message_input: ''})
        this.scrollBottom(true)

        fetch(`${API_ROOT}/api/v1/bot`, {
            method: 'POST',
            credentials: 'include',
            crossDomain: true,
            body: formData
        })
        .then(response => response.json())
        .then((json) => {
            if (json.code === 200) {
                this.dispatchMessage(json.data)
                this.scrollBottom(true)
            }
        })
    }

    handleSignOut = (e) => {
        e.preventDefault()

        const {dispatcherRequest} =  this.props
        fetch(`${API_ROOT}/api/v1/user/signout`, {
            method: 'POST',
            credentials: 'include',
            crossDomain: true
        })
        .then(response => response.json())
        .then((data) => {
            data.code === 200
                ? dispatcherRequest(false, 0, '')
                : dispatcherRequest(true, 401, 'Error')
        })
    }

    scrollBottom = (isSmooth) => {
        setTimeout(() => {
            const content = document.getElementById('chat_content')
            if (isSmooth) {
                content.scroll({
                    top: content.scrollHeight,
                     behavior: 'smooth'
                 }) 
            } else {
                content.scrollTop = content.scrollHeight
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
                                        <img className="_i3xlc _i3ci _ma3m3b" src="../img/img.jpg" alt="logo" />
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
                        {/* <div className="overlay"></div> */}
                        <span className="_ma3l3lr">
                            <img className="_i3l _i3ci _ma" src="../img/img.jpg" alt="logo" />
                        </span>
                        <div>
                            <p className="_he3m _ma">gimBot</p>
                            <p className="_ct3w">Ask me anything about practicum</p>
                        </div>
                    </header>
                    {/* content */}
                    <div id="chat_content" className="_cn _cn3cl _ch3cnt">
                        <div className="_ch3pn _emt"></div>
                        <div className="_ch3pn">
                            {/* chatting container */}
                            {this.state.message_histories.map((val, i) => {
                                return val.status === STATUS_USER
                                    ? (
                                        <ChatUser
                                            key={i}
                                            username={this.state.user_name}
                                            message={val.message.text} 
                                            time={val.time}/>)
                                    : (
                                        <ChatBot
                                            key={i}
                                            user_name="gimBot"
                                            message={val.message} 
                                            time={val.time}/>
                                    )
                            })}
                        </div>
                    </div>
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
                                onKeyDown={(e)=>{
                                    if (e.key === 'Enter') {
                                        return this.handleSubmit(e)
                                    }
                                }}/>
                            <span id="__ch3sb" className="_ma3m3l" onClick={this.handleSubmit}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                    <path fill="#bbbbbb" fillOpacity=".9" d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z">
                                    </path>
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
        dispatcherRequest: (is_logged_in, request_status, error_message) => dispatch(actorRequest(is_logged_in, request_status, error_message))
    }
}
export default connect(mapStatetoProps, mapDispatchtoProps)(Home)
