// Class Component
import React from "react";

class EditContact extends React.Component {
    constructor(props) {
        console.log("PROps:", props.location.state.contact)
        super(props)    
        const {id, name, email} = props.location.state.contact;
        this.state = {
            // id: id, name: name, email: email -- ES6 allows us to shorten to what's shown below
            id,
            name,
            email
        };
    }

    state = {
        name: "",
        email: "",
    }

    update = (e) => {
        e.preventDefault();  // do not want page to get refreshed
        if(this.state.name === "" || this.state.email === "") {
            alert("All the fields are mandatory");
            return;
        }

        // Pass props to App.js, then clear the fields
        this.props.updateContactHandler(this.state);
        this.setState({ name: "", email: "" });
        // Progammatically route back to ContactList page
        this.props.history.push("/");
    }

    render() {
        return (
            <div className="ui main">
                <h2>Edit Contact</h2>
                <form className="ui form" onSubmit={this.update}>
                    <div className="field">
                        <label>Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Name"
                            value={this.state.name} 
                            onChange={ (e) => this.setState({name: e.target.value}) }/>
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input 
                            type="text" 
                            name="email" 
                            placeholder="Email" 
                            value={this.state.email} 
                            onChange={ (e) => this.setState({email: e.target.value}) }/>
                    </div>
                    <button className="ui button blue">Update</button>
                </form>
            </div>
        );
    }
}

export default EditContact;