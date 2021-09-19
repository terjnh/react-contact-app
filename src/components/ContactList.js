import React, { useRef } from "react";
import { Link } from 'react-router-dom';
import ContactCard from './ContactCard';

const ContactList = (props) => {
    console.log("ContactList", props);
    const inputEl = useRef("");

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

    const getSearchTerm = () => {
        // console.log("inputEl", inputEl.current.value)  //keyboard input value
        props.searchKeyword(inputEl.current.value)
    };

    return (
        <div class="main">
            <br></br><br></br>
            <h2>
                Contact list
                <a className="ui-icon-add-contact"></a>
                <Link to="/add">
                    <button className="ui button blue right">Add Contact</button>
                </Link>
            </h2>

            <div className="ui search">
                <div className="ui icon input">
                    <input
                        ref={inputEl}
                        type="text"
                        placeholder="Search contacts"
                        className="prompt"
                        value={props.term}
                        onChange={getSearchTerm} />
                    <i className="search icon"></i>
                </div>
            </div>

            <div className="ui celled list">{renderContactList.length > 0 ? renderContactList : "No contacts available"}</div>

            <br></br>


        </div>
    );
};

export default ContactList;