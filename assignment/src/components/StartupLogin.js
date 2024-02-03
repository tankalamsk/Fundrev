import React, { useState } from 'react';
import StartupDashboard from '../pages/StartupDashboard';



function StartupLogin(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isloggedin,setIsloggedin] =useState(false);
  const handle =()=>{
    return (
      <StartupDashboard/>
    )
  }
  const handleSignUpClick = () => {
    props.set(true);
  };

  const handleSignInClick = async () => {
    try {
      const response = await fetch('http://localhost:4000/assignment/src/components/StartupLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Successful login
        setIsloggedin(true)
       alert("login success")
      } else {
        // Incorrect credentials
        alert(responseData.message);
      }
    } catch (error) {
      console.log("waste")
      console.error('Error:', error);
    }
  };

  return (

    <div>

    {(isloggedin)? <StartupDashboard email={email} password={password}/> : 
    <div className="Login">
    <form className="form">
      <p className="form-title">Sign in to your account</p>
      <div className="input-container">
        <input
          placeholder="Enter email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
        <span></span>
      </div>
      <div className="input-container">
        <input
          placeholder="Enter password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        <span></span>
      </div>
      <button className="submit" type="button" onClick={handleSignInClick}>
        Sign in
      </button>

      <p className="signup-link">
        No account?
        <a href="#" onClick={handleSignUpClick}>Sign up</a>
      </p>
    </form>
  </div>
}

  </div>
    
  );
}

export default StartupLogin;
