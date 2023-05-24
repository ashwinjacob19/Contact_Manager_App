import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import AddContact from './components/AddContact/AddContact'
import ContactList from './components/ContactList/ContactList'
import { v4 as uuidv4 } from 'uuid';
import ContactDetail from './components/ContactDetail/ContactDetail'
import api from '../src/api/contacts'
import EditContact from './components/EditContact/EditContact'

function App() {

  // const contacts = [
  //   {
  //     id: "1",
  //     "name": "John",
  //     "email": "john@example.com",
  //   },
  //   {
  //     id: "2",
  //     "name": "Smith",
  //     "email": "smith@example.com",
  //   },
  // ];
  const LOCAL_STORAGE_KEY = "contacts"
  const [contacts,setContacts] = useState([])
  const [searchTerm,setSearchTerm] = useState("")
  const [searchResults,setSearchResults] = useState([])
  //Retrieve Contacts

  const retrieveContacts = async () => {
    const response = await api.get("/contacts")
    return response.data
  }

  const addContactHandler = async (contact)=>{
    console.log(contact)
    const request = {
      id:uuidv4(),
      ...contact
    }

    const response = await api.post("/contacts",request)
    setContacts([...contacts,response.data]) 
    // setContacts([...contacts,{id: uuidv4(), ...contact}])
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...contacts,{id: uuidv4(), ...contact}]))
  } 

  const updateContactHandler = async (contact) => {
    console.log(contact);
    const response = await api.put(`/contacts/${contact.id}`,contact)
      //headers: { 'Content-Type': 'text/json'}
    //});
    console.log(response.data);
    const {id, name, email} = response.data;
    setContacts(contacts.map(contact => {
      return contact.id === id ? {...response.data} : contact;
    }))
  }


  const removeContactHandler =async (id)=>{
    await api.delete(`/contacts/${id}`)
    const newContactList = contacts.filter((contact)=>{
      return contact.id !==id
    }) 
    setContacts(newContactList)
    
  }

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if(searchTerm != "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
        .join(" ").toLowerCase()
        .includes(searchTerm.toLowerCase());
      })
      setSearchResults(newContactList);
    }
    else{
      setSearchResults(contacts);
    }
  }

  

  useEffect(()=>{
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    // if(retriveContacts) {
    //   setContacts(retriveContacts)
    // }

    const getAllContacts = async () => {
      const allContacts = await retrieveContacts()
      if(allContacts) {
          setContacts(allContacts)
      }
    }
    
    getAllContacts()
  },[])


  return (
    <div className='ui container'>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ContactList  
          contacts={searchTerm.length < 1 ? contacts : searchResults} 
          getContactId={removeContactHandler} 
          term={searchTerm} 
          searchKeyword={searchHandler}/>} 
          />
          <Route 
            path="/add"
            exact
            // render={(props)=>(
            //   <AddContact 
            //   {...props} 
            //   addContactHandler={addContactHandler}
            //   />
            // )}
            element={<AddContact addContactHandler={addContactHandler} />}
          />
          <Route path="/contact/:id" element={<ContactDetail />} />

          <Route path="/edit" element={<EditContact updateContactHandler={updateContactHandler} />} />
        </Routes>
        
        {/* <AddContact addContactHandler={addContactHandler}/>
        <ContactList contacts={contacts} getContactId = {removeContactHandler}/> */}
      </Router>
      
    </div>
  )
}

export default App
