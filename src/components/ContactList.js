import React from "react";
import { Link } from 'react-router-dom';
import ContactCard from './ContactCard';

const ContactList = (props) => {
    // console.log("ContactList", props);

    const deleteContactHandler = (id) => {
        console.log("deleteContactHandler")
        props.getContactId(id);
    };

    const renderContactList = props.contacts.map((contact) => {
        return (
            <ContactCard
                contact={contact}
                clickHandler={deleteContactHandler}
                key={contact.id}
            />
        );
    })

    return (
        <div class="main">
            <br></br><br></br>
            <h2>
                Contact list
                <Link to="/add">
                <button className="ui button blue right">Add Contact</button>
                </Link>
            </h2>
            <div className="ui celled list">{renderContactList}</div>
        </div>
    );
};

export default ContactList;