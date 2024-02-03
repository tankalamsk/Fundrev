import "./InvesterSignup.css";
import {useState} from 'react'

function InvesterSignup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSigninClick = () => {
    props.set(false);
  };
  const handleSignupClick = async () => {
    try {
      const response = await fetch('http://localhost:4000/assignment/src/components/InvesterSignup.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Successfully signed up
       alert("Account Created")
       props.set(false);
      } else {
        // Handle error
        console.error('Sign up failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
 

  return (
    <div className="InvesterSignup"> 
      <form className="form">
        <p className="form-title">SignUp to your account</p>
        <div className="input-container">
          <input placeholder="Enter email" type="email" onChange={(e) => setEmail(e.target.value)}/>
          <span></span>
        </div>
        <div className="input-container">
          <input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
          <span></span>
        </div>
       
        <button className="submit" type="submit" onClick={handleSignupClick} >
            Submit
        </button>

        <p className="signup-link">
          <a href="#" onClick={handleSigninClick}>Sign In</a>
        </p>
      </form>
    </div>
  );
}

export default InvesterSignup
