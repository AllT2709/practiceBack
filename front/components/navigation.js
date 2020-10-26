import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import store from './store';


class Navigation extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isLogged: null
        }
    }
    componentDidMount() {
        this.setState({
            isLogged: store.getState().auth.isAuth
        });

        console.log('2');
    }
    render() {
        console.log('1');
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">ContactApp</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="navbar-nav ">
                        <Link className="nav-link  " to="/profile">Profile</Link>
                        <Link className="nav-link" to="/contacts">Contacts</Link>
                    </div>
                    <div className="navbar-nav ml-auto">
                        { this.state.isLogged ? (<Link className="nav-link" to="/">Logout</Link>)
                            : (<><Link className="nav-link" to="/login">Login</Link>
                                <Link className="nav-link" to="/register">Register</Link>
                            </>)
                        }
                    </div>
                </div>
            </nav>

        )
    }
}
export default Navigation;