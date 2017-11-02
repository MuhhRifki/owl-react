import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import {actorRequest} from '../../action/action'
class Navbar extends Component {

    handlerSignOut = (dispatcherRequest) => {
        fetch('https://meikoapp.herokuapp.com/api/v1/user/signout', {
            method: 'POST',
            credentials: 'include',
            crossDomain: true
        }).then((res) => {
            return res.json()
        }).then((data) => {
            data.code === 200
                ? dispatcherRequest(false, 0, '')
                : dispatcherRequest(true, 401, 'Error')

        })
    }
    
    render() {
        const {is_logged_in} = this.props

        return (is_logged_in
            ? <div className="_c5m31 _c5x31 _ma3n3l _pd3n3r">
                    <nav className="_cn5n">
                        <i className="fa fa-bars _ic3l5w " aria-hidden="true"></i>
                        <ul className="_n">
                            <div className="_n51"></div>
                            <div className="_n52">
                                <li>
                                    <Link to={'/'}>
                                        <i className="fa fa-cog" aria-hidden="true"></i>
                                    </Link>
                                </li>
                                <li
                                    id="signout"
                                    onClick={(e) => {
                                    e.preventDefault();
                                    this.handlerSignOut(this.props.dispatcherRequest)
                                }}>
                                    <Link to={'#'}>
                                        <i className="fa fa-power-off" aria-hidden="true"></i>
                                    </Link>
                                </li>
                            </div>
                        </ul>
                    </nav>
                </div>
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
export default connect(mapStatetoProps, mapDispatchtoProps)(Navbar)
