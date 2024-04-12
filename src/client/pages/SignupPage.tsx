import React, { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom'; 

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false); // State to track successful signup

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/signup', { email, password });
      console.log(response.data);
      setSignupSuccess(true); // Set signup success state
    } catch (error) {
      console.error('Signup failed:', error);
      setError('Signup failed. Please try again.'); // Set error message
    }
  };

  // Render success message and redirect to login page after successful signup
  if (signupSuccess) {
    return (
      <div className="p-5">
        <h2 className="text-2xl font-bold mb-4">Signup Successful!</h2>
        <p>You have successfully signed up. Please proceed to <NavLink to="/login" className="text-blue-500">login</NavLink>.</p>
      </div>
    );
  }

  // Render signup form
  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      {error && <p className="text-red-500">{error}</p>} {/* Display error message if exists */}
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded px-3 py-2 mb-3"
      />
       <br></br>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded px-3 py-2 mb-3"
      />
       <br></br>
      <button
        onClick={handleSignup}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Signup
      </button>
    </div>
  );
}

export default SignupPage;