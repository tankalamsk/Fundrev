import React, { useState } from 'react';

function StartupSignup(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [revenue, setRevenue] = useState(0);

  const handleSignInClick = () => {
    props.set(false);
  };

  const handleSignupClick = async () => {
    try {
      const response = await fetch('http://localhost:4000/assignment/src/components/StartupSignup.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, companyName, businessDescription, revenue }),
      });

      const responseData = await response.json();

      if (response.ok) {
        props.set(false)
        alert(responseData.message);
      } else {
        alert(responseData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    
        <div >
      <form className="form">
        <p className="form-title">SignUp to your account</p>
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
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span></span>
        </div>
        <div className="input-container">
          <input
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <span></span>
        </div>
        <div className="input-container">
          <input
            placeholder="Business Description"
            value={businessDescription}
            onChange={(e) => setBusinessDescription(e.target.value)}
          />
          <span></span>
        </div>
        <div className="input-container">
          <input
            placeholder="Revenue"
            type="number"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
          />
          <span></span>
        </div>
        <button className="submit" type="button" onClick={handleSignupClick}>
          Submit
        </button>

        <p className="signup-link">
          <a href="#" onClick={handleSignInClick}>Sign In</a>
        </p>
      </form>
    </div>
 
    
  );
}

export default StartupSignup;
