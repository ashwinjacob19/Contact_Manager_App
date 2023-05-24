import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddContact(props) {

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const navigate = useNavigate();

  const add = (e)=>{
    e.preventDefault()
    if(name==='' || email==='')
    {
      alert("All the fields are mandatory")
      return
    }
    props.addContactHandler({name,email})
    setName('')
    setEmail("")
    navigate('/')
  }
  return (
    <div className='ui main'>
      <h2>Add Contact</h2>
      <form className='ui form' onSubmit={add}>
        <div className='ui field'>
          <label >Name</label>
          <input 
            type="text" 
            name='name' 
            placeholder='Name' 
            value={name} 
            onChange={(event)=>setName(event.target.value)}/>
        </div>
        <div className='ui field'>
          <label >Email</label>
          <input 
            type="text" 
            name='email' 
            placeholder='Email' 
            value={email} 
            onChange={(event)=>setEmail(event.target.value)}
           />
        </div>
        <button className='ui button blue'>Add </button>
      </form>
    </div>
  )
}
