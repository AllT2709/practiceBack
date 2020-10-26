import React from 'react';
import { connect } from 'react-redux'
import  PropTypes from 'prop-types'
import { register } from '../actions/authActions';


class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            name: "",
            username: "",
            email: "",
            password: ""
        }
    }
    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value});
        
    }
    onSubmit = e =>{
        e.preventDefault()

        const newUser = {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        this.props.register(newUser,this.props.history);
        
    }

    render() {
        return (
            <div className="container" style={{ width: "530px",marginTop:"20px" }}>
                <div className="card card-body">
                    <form onSubmit={this.onSubmit}> 
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={this.handleChange}
                                value={this.state.name}
                                id="name"

                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text"
                                className="form-control"
                                id="username"
                                onChange={this.handleChange}
                                value={this.state.username} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email adress</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                aria-describedby="emailHelp"
                                onChange={this.handleChange}
                                value={this.state.email}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                onChange={this.handleChange}
                                value={this.state.password}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>

            </div>

        )
    }
}

Register.propTypes = {
    register: PropTypes.func.isRequired,
    auth: PropTypes.bool
}

const mapStateToProps = state => ({
    auth: state.auth.isRegistered,
})

export default connect(mapStateToProps,{ register })(Register);