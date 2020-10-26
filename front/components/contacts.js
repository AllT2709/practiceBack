import React from 'react';
import { Link } from 'react-router-dom'
import store from './store';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { addContact, getContact } from '../actions/contactsActions'

class Contact extends React.Component {
    state = {
        isLogged: store.getState().auth.isAuth,
        name: '',
        number: ''
    }
    componentDidMount() {
        this.setState({
            isLogged: store.getState().auth.isAuth
        })
        if (!this.state.isLogged) {
            this.props.history.push('/login')
        }

        this.props.getContact();
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }
    onSubmit = (e) => {
        e.preventDefault();
        const newContact = {
            name: this.state.name,
            number: this.state.number
        }
        this.props.addContact(newContact)
    }

    render() {
        const displayContact = this.props.contacts.map(contact => {
            <div className="card-body" key={contact._id}>
                <h5 className="card-title">{contact.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{contact.number}</h6>
                <Link href="#" className="card-link">Delete</Link>
                <Link href="#" className="card-link">Update</Link>
            </div>
        })
        return (
            <div className='row'>
                <div className="col-md-4">
                    <div className="card card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    onChange={this.handleChange}
                                    aria-describedby="emailHelp"
                                    value={this.state.name}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="number">Number</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="number"
                                    onChange={this.handleChange}
                                    value={this.state.number}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card" style={{width: "18rem"}}>
                        {displayContact}
                    </div>
                </div>
            </div>
        )
    }
}

Contact.protoTypes = {
    addContact: PropTypes.func.isRequired,
    getContact: PropTypes.func.isRequired,
    contact: PropTypes.array.isRequired,
    newContact: PropTypes.object
}

const mapStateToProps = state => ({
    contacts: state.contacts.contacts,
    newContact: state.contacts.newContact,
})

export default connect(mapStateToProps, { addContact, getContact })(Contact);