import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

const DialogDelete = (props) => {
    console.log("DIalogDelete,props", props)
    const { id, name } = props.location.state.contact;
    const { deleteFn } = props.location.data;
    return (
        <div className="main">
            <br></br><br></br><br></br><br></br>
            <a class="item">
                <i class="exclamation triangle icon"></i>
                <br></br><br></br>
                <div class="ui label" className="med-label-1">
                    Are you sure you wish to delete username: {name} ?
                </div>
                <br></br>
                <a style={{ marginLeft: '0rem' }}>
                    <div class="ui buttons">
                        <Link to="/">
                            <button class="ui button"
                                onClick={() => {
                                    console.log("YES!")
                                    deleteFn(id)
                                }}>
                                Yes
                            </button>
                        </Link>
                        <div class="or"></div>
                        <Link to="/">
                            <button class="ui positive button"
                                onClick={() => {
                                    console.log("No - return to main")
                                }}>
                                No
                            </button>
                        </Link>
                    </div>
                </a>
            </a>
        </div>
    );
};

export default DialogDelete;