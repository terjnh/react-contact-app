import React from "react";
import { Link } from "react-router-dom";
import user from "../images/user.jpg";

const ContactDetail = (props) => {
    console.log("ContactDetail-props:", props)
    const { name, email } = props.location.state.contact;
    return (
        <div className="main">
            <div className="ui card centered">
                <div className="uimage">
                </div>
                <img src={user} alt="user" />
                <div className="content">
                    <div className="header">{name}</div>
                    <div className="description">{email}</div>
                </div>
            </div>
            <div className="center-div">
                <Link to="/">
                    <button className="ui button nlue center">Back to Contact List</button>
                </Link>
            </div>
        </div>
    );
};

export default ContactDetail;