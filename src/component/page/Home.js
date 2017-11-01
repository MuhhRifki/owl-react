import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import {Navbar} from '../index.js'
//import {InputContent} from '../index.js'

class Message extends Component {
    render() {
        return (
            <div>
                {(this.props.content.user === 0)
                    ? <div className="_c5m312 _c5x312 _ma3l3t">
                            <div className="_c5m312 _c5x312">
                                <h2 className="_he3sb">gimBot</h2>
                                <div className="_ch3a _c5m38">
                                    <p className="_he3s">{this.props.content.messageResponses}</p>
                                </div>
                            </div>
                            <p className="_he3s _c5m312">{new Date().toDateString()}</p>
                        </div>
                    : <div className="_c5m312 _c5x312 _ma3l3t">
                        <div className="_c5m312 _c5x312">
                            <h2 className="_he3sb5r">(Your Name)</h2>
                            <div className="_ch3b _c5m38 _pl5r">
                                <p className="_he3s5r">{this.props.content.message}</p>
                            </div>
                        </div>
                        <p className="_he3s5r _c5m312 _pl5r">{new Date().toDateString()}</p>
                    </div>}
            </div>
        )
    }
}

class Home extends Component {
    constructor() {
        super();
        this.state = {
            conversation: [],
            message: ""
        }
        this.handleSubmit = this
            .handleSubmit
            .bind(this)
        this.handleChange = this
            .handleChange
            .bind(this)
    }

    handleChange(e) {
        this.setState({conversation: this.state.conversation, message: e.target.value})
    }

    handleSubmit(e) {

        e.stopPropagation()
        e.preventDefault()
        const conversation = this.state.conversation
        const message = this.state.message
        conversation.push({message: this.state.message, user: 1})
        this.setState({conversation: conversation, message: ""})
        let form = new FormData()
        form.append('chat', message)
        fetch('', {
            method: "POST",
            body: form
        }).then((data) => {
            conversation.push({message: data.chat, user: 0})
            this.setState({conversation: conversation, message: ""})
        })
    }

    render() {
        return (
            <body className="_fx">
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
                            <div className="_c5m312 _c5x312 _ma3l3t">
                                <div className="_c5m312 _c5x312">
                                    <h2 className="_he3sb">gimBot</h2>
                                    <div className="_ch3a _c5m38">
                                        <p className="_he3s">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                            commodo consequat.</p>
                                    </div>
                                </div>
                                <p className="_he3s _c5m312">10:12 AM, Today</p>
                            </div>
                            <div className="_c5m312 _c5x312 _ma3l3t">
                                <div className="_c5m312 _c5x312">
                                    <h2 className="_he3sb5r">(Your Name)</h2>
                                    <div className="_ch3b _c5m38 _pl5r">
                                        <p className="_he3s5r">Duis aute irure dolor in reprehenderit in voluptate velit
                                            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                                            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                                    </div>
                                </div>
                                <p className="_he3s5r _c5m312 _pl5r">10:15 AM, Today</p>
                            </div>
                            <div className="_c5m312 _c5x312 _ma3l3t">
                                <div className="_c5m312 _c5x312">
                                    <h2 className="_he3sb">gimBot</h2>
                                    <div className="_ch3a _c5m38">
                                        <p className="_he3s">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                            commodo consequat.</p>
                                    </div>
                                </div>
                                <p className="_he3s _c5m312">10:12 AM, Today</p>
                            </div>

                            {(this.state.conversation !== undefined)
                                ? this.state.conversation.map((content, id) => {
                                    return <Message key={id} content={content}/>
                                })
                                : ""}
                        </div>
                    </div>

                    <div className="_cm312 _pd3n3t _ma3n3t _pd3n3lr">
                        <div class="_c5m312 _c5x312 _ch3ms">
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
            </body>
        );
    }
}

export default Home;
