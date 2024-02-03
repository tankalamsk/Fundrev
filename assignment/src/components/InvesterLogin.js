import { useRoutes } from "react-router-dom";
import "./InvesterLogin.css";
import { useState } from "react";
import InvesterDashboard from "../pages/InvesterDashboard"


function InvesterLogin(props) {
const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isloggedin,setIsloggedin] =useState(false);

  const handleSignUpClick = () => {
    props.set(true);
  };

  const handleSignInClick = async () => {
    try {
      const response = await fetch('http://localhost:4000/assignment/src/components/InvesterLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Successful login
        setIsloggedin(true);
        alert(responseData.message);
      } else {
        // Incorrect credentials
        alert(responseData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (

    <div>
      {(isloggedin===true)? <InvesterDashboard email={email} password={password}/> : 
      <div className="InvesterLogin"> 
      <form className="form">
        <p className="form-title">Sign in to your account</p>
        <div className="input-container">
          <input placeholder="Enter email" type="email" onChange={(e) => setEmail(e.target.value)}/>
          <span></span>
        </div>
        <div className="input-container">
          <input placeholder="Enter password" type="password" onChange={(e) => setPassword(e.target.value)} />
          <span></span>
        </div>
        <button className="submit" type="submit" onClick={handleSignInClick}>
          Sign in
        </button>

        <p className="signup-link">
          No account?
          <a href="#" onClick={handleSignUpClick}>Sign up</a>
        </p>
      </form>
    </div>}
    </div>
    
  );
}

export default InvesterLogin;
