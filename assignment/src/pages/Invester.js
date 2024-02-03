import { useState } from 'react';
import './Invester.css'
import InvesterLogin from '../components/InvesterLogin';
import InvesterSignup from '../components/InvesterSignup';

function Invester (){
    const [signup,setSignup] = useState(false)
    console.log(signup)
    return (
       
        <div className='Invester'> 
            {(signup===false) ? <InvesterLogin set={setSignup}/> : <InvesterSignup set = {setSignup}/>}
        </div>
    )
}


export default Invester