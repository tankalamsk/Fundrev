import { useState } from 'react';
import './Startup.css'
import StartupLogin from '../components/StartupLogin';
import StartupSignup from '../components/StartupSignup';

function Startup (){
    const [signin,setSignin] = useState(false)
    
    return (
       
        <div className='Startup'> 
            {(signin===false) ? <StartupLogin set={setSignin}/> : <StartupSignup set = {setSignin}/>}
        </div>
    )
}


export default Startup