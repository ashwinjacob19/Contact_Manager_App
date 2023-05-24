import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const EditContact = (props)=>{


  // const [name,setName] = useState("")
  // const [email,setEmail] = useState("")
  // const navigate = useNavigate();

  // const update = (e)=>{
  //   e.preventDefault()
  //   if(name==='' || email==='')
  //   {
  //     alert("All the fields are mandatory")
  //     return
  //   }
  //   props.addContactHandler({name,email})
  //   setName('')
  //   setEmail("")
  //   navigate('/')
  // }
  const location = useLocation();
    console.log(location);
    const data = location.state.contact;
    const {id, name, email} = data;
    const [sname, setSname] = useState(name);
    const [semail, setSemail] = useState(email);
    const navigate = useNavigate();
    
    const update = (e) => {
        e.preventDefault();
        if(sname == "" || semail == ""){
            alert("All the fields are mandatory!");
            return
        }
        
        const updateValue = {id:id, name:sname, email:semail}      
        props.updateContactHandler(updateValue);
        setSname("")
        setSemail("")
        navigate("/")
    }
  return (
    <div className='ui main'>
      <h2>Edit Contact</h2>
      <form className='ui form' onSubmit={update}>
        <div className='ui field'>
          <label >Name</label>
          <input 
            type="text" 
            name='name' 
            placeholder='Name' 
            value={sname} 
            onChange={(event)=>setSname(event.target.value)}/>
        </div>
        <div className='ui field'>
          <label >Email</label>
          <input 
            type="text" 
            name='email' 
            placeholder='Email' 
            value={semail} 
            onChange={(event)=>setSemail(event.target.value)}
           />
        </div>
        <button className='ui button blue'>Update </button>
      </form>
    </div>
  )
}
export default EditContact
