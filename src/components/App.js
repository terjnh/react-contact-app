// useEffect: for local storage
import React, { useState, useEffect } from "react";
import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import SampleComp from "./SampleComp";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [samples, setSamples] = useState([]);


  const addContactHandler = (contact) => {
    console.log("Before add:", contacts);
    setContacts([...contacts, contact]);
  };

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
      <Header />
      <AddContact addContactHandler={addContactHandler} />
      <ContactList contacts={contacts} />


      <SampleComp modifySampleHandler={modifySampleHandler}/>
    </div>
  );
}

export default App;
