import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

import Navigation from './navigation'
import Hello from './helloUser'
import Register from './register';
import Login from './login';
import Profile from './profile'
import Contacts from './contacts'

import { Provider } from 'react-redux'
import store from './store';

class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Navigation />
                    <Switch>
                        <Route path="/" exact component={Hello} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/register" component={Register} />
                        <Route path="/login" component={Login} />
                        <Route path="/contacts" component={Contacts} />
                    </Switch>
                </Router>
            </Provider>

        )

    }
}
export default App;