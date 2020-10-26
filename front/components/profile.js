import React from 'react';
import store from './store';


class Profile extends React.Component {
     state ={
            isLogged: store.getState().auth.isAuth
        }
    componentDidMount(){
        this.setState({
            isLogged: store.getState().auth.isAuth
        })
        if(!this.state.isLogged){
            this.props.history.push('/login')
        }
    }
    render() {
        
        console.log(this.state.isLogged);
        return (
            <h1>Welcome (insert username or name)!!!</h1>
        )

    }
}

export default Profile;