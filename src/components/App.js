// useEffect: for local storage
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { uuid } from 'uuidv4';
import api from '../api/contacts';
import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import SampleComp from "./SampleComp";
import ContactDetail from "./ContactDetail"
import DialogDelete from "./DialogDelete";
import EditContact from "./EditContact";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [samples, setSamples] = useState([]);

  // RetrieveContacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };


  const addContactHandler = async (contact) => {
    // console.log("Before add:", contacts);
    const request = {
      id: uuid(),
      ...contact
    }

    const response = await api.post("/contacts", request)
    console.log("response:", response)
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact)
    const { id, name, email } = response.data;
    setContacts(
      contacts.map((contact) => {
        // only manipulate (update) data based on matching id
        return contact.id === id ? { ...response.data } : contact
      })
    );
  };


  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
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


  const searchHandler = (searchTerm) => {
    // Keyboard Input -> from ContactList.js
    // console.log("searchTerm", searchTerm)

    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        // console.log( Object.values(contact).join(" "))
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      });
      setSearchResults(newContactList);
    }
    else {
      setSearchResults(contacts);
    }
  };

  // upon page refresh, we will retrieve 'contacts'
  useEffect(() => {
    // const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retrieveContacts) { setContacts(retrieveContacts); }

    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) {
        // Update the state
        setContacts(allContacts);
      }
    };

    getAllContacts();
  }, []);

  // set contacts into local storage
  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
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
                contacts={searchTerm.length < 1 ? contacts : searchResults}
                getContactId={removeContactHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
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

          <Route
            path="/edit"
            render={(props) => (
              <EditContact {...props} updateContactHandler={updateContactHandler} />
            )}
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
