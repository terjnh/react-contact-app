// useEffect: for local storage
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { uuid } from 'uuidv4';
import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import SampleComp from "./SampleComp";
import ContactDetail from "./ContactDetail"
import DialogDelete from "./DialogDelete";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [samples, setSamples] = useState([]);


  const addContactHandler = (contact) => {
    // console.log("Before add:", contacts);
    setContacts([...contacts, { id: uuid(), ...contact }]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      console.log("removeContactHandler~contact:", contact);
      return contact.id !== id;
    });

    console.log("newContactList: ", newContactList)
    setContacts(newContactList);
  }

  const modifySampleHandler = (sample) => {
    console.log("Sample: ", sample)
    setSamples([sample])
  }

  // upon page refresh, we will retrieve 'contacts'
  useEffect(() => {
    const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retrieveContacts) { setContacts(retrieveContacts); }
  }, []);

  // set contacts into local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);



  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <ContactList
                {...props}
                contacts={contacts}
                getContactId={removeContactHandler}
              />
            )}
          />
          <Route
            path="/add"
            render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />
            )}
          />

          <Route
            path="/contact/:id" component={ContactDetail}
          />

          <Route
            path="/deleteConfirm/:id" component={DialogDelete}
          />
        </Switch>

        {/* <AddContact addContactHandler={addContactHandler} /> */}
        {/* <ContactList contacts={contacts} getContactId={removeContactHandler} /> */}

        {/* <SampleComp modifySampleHandler={modifySampleHandler} /> */}
      </Router>

    </div>
  );
}

export default App;
