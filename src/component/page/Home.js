import React, {Component} from 'react'

import {Navbar} from '../index.js'

const STATUS_BOT = 1
const STATUS_USER = 0

class Home extends Component {
    constructor() {
        super();
        this.state = {
            conversation: [],
            message: "",
            username: ""
        }
    }

    componentWillMount(){
        this.loadUser()
        this.loadHistory()
    }

    loadUser = () => {
        fetch('https://meikoapp.herokuapp.com/api/v1/user/profile', {
            method: "GET",
            credentials: 'include',
            crossDomain: true
        })
        .then(response => response.json())
        .then((json) => {
            json.code === 200
                ? this.setState({name: json.data.name})
                : console.log('err')
        })
    }

    loadHistory = () => {
        const timestamp = parseInt(new Date().getTime() / 1000, 10)
        const url = 'https://meikoapp.herokuapp.com/api/v1/bot?time=' + timestamp
        fetch(url, {
            method: "GET",
            credentials: 'include',
            crossDomain: true
        })
        .then(response => response.json())
        .then((json) => {
            json.code === 200
                ? json.data.map((val) => this.dispatchMessage(val))
                : console.log('err')
        })
    }

    dispatchMessage = (data) => {
        const {response, status} = data
        const conversation = this.state.conversation
        const timestamp = data.time ? data.time : parseInt(new Date().getTime() / 1000, 10)

        // chat from user
        if (status === 0) {
            conversation.push({message: response.text, user: status, time: timestamp})
            this.setState({conversation: conversation})
            return
        }

        // chat from bot
        switch (response.intent) {
        case 'assistant':
            conversation.push({message: response.intent, user: status, time: timestamp})
            break
        case 'schedule':
            conversation.push({message: response.intent, user: status, time: timestamp})
            break
        case 'information':
            conversation.push({message: response.intent, user: status, time: timestamp})
            break
        case 'grade':
            conversation.push({message: response.intent, user: status, time: timestamp})
            break
        case 'assignment':
            conversation.push({message: response.intent, user: status, time: timestamp})
            break
        default:
            break
        }

        this.setState({
            conversation: conversation,
            message: ""
        })
    }

    handleChange = (e) => {
        this.setState({conversation: this.state.conversation, message: e.target.value})
    }

    handleSubmit = (e) => {
        e.stopPropagation()
        e.preventDefault()

        const conversation = this.state.conversation
        const message = this.state.message
        const timestamp = parseInt(new Date().getTime() / 1000, 10)

        conversation.push({message: message, user: STATUS_USER, time: timestamp})
        this.setState({conversation: conversation, message: ""})

        const form = new FormData()
        form.append('text', message)

        fetch('https://meikoapp.herokuapp.com/api/v1/bot', {
            method: "POST",
            credentials: 'include',
            body: form
        })
        .then(response => response.json())
        .then((json) => {
            json.code === 200
                ? this.dispatchMessage(json.data)
                : console.log('err')
        })
    }

    render() {
        return (
            <div className="_c5m312 _pd3n3lr">
                <div className="_f5b _c5m312 _c5tm32 _c5tx32">
                    <Navbar/>
                    <div className="_c5m35 _c5x311 _ma3n3r _pd3n3lr">
                        <img className="_i3l _i3ci _pl5l" src="../img/img.jpg" alt="logo"/>
                        <p className="_he3m">gimBot</p>
                        <p className="_ct3w">Ask me anything about your problem</p>
                    </div>
                </div>
                <div className="_cb _c5m312 _c5tm37 _c5tx37">
                    <div className="_c5m312 _c5x312">
                        {(this.state.conversation !== undefined)
                            ? this.state.conversation.map((content, id) => {
                                return <Message key={id} content={content} name={this.state.name}/>
                            })
                            : ""}
                    </div>
                </div>

                <div className="_cm312 _pd3n3t _ma3n3t _pd3n3lr">
                    <div className="_c5m312 _c5x312 _ch3ms">
                        <form id="send-message" onSubmit={this.handleSubmit}>
                            <input
                                className="_txa3m"
                                onChange={this.handleChange}
                                type="text"
                                name="text"
                                autoComplete="off"
                                value={this.state.message}/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

class Message extends Component {
    
    render() {
        const time_now = new Date(this.props.content.time * 1000).toString()
        const name = this.props.name ? this.props.name : 'Unknown'
        return (
            <div>
                {(this.props.content.user === STATUS_BOT)
                ?   <div className="_c5m312 _c5x312 _ma3l3t">
                        <div className="_c5m312 _c5x312">
                            <h2 className="_he3sb">gimBot</h2>
                            <div className="_ch3a _c5m38">
                                <p className="_he3s">{this.props.content.message}</p>
                            </div>
                        </div>
                        <p className="_he3s _c5m312">{time_now}</p>
                    </div>
                :   <div className="_c5m312 _c5x312 _ma3l3t">
                        <div className="_c5m312 _c5x312">
                            <h2 className="_he3sb5r">{name}</h2>
                            <div className="_ch3b _c5m38 _pl5r">
                                <p className="_he3s5r">{this.props.content.message}</p>
                            </div>
                        </div>
                        <p className="_he3s5r _c5m312 _pl5r">{time_now}</p>
                    </div>}
            </div>
        )
    }
}

export default Home;
