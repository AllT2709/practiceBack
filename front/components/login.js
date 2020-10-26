import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import  PropTypes from 'prop-types'

import { login } from '../actions/authActions'

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: ""
        }
    }
    
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault();
        const userLog = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.login(userLog,this.props.history);
    }


    render() {
        return (
            <div className="container" style={{ width: "530px", marginTop: "20px" }}>
                <div className="card card-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email adress</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                onChange={this.onChange}
                                aria-describedby="emailHelp"
                                value={this.state.email}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                onChange={this.onChange}
                                value={this.state.password}
                            />
                        </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <Link className="btn btn-secondary" to="/register" > Don't have an account?</Link>
                    </form>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    auth: PropTypes.bool
}

const mapStateToProps = state => ({
    auth: state.auth.isAuth,
})

export default connect(mapStateToProps,{ login })(Login);