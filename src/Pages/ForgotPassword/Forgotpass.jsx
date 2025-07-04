import React from 'react';
import { Link } from 'react-router';

const Forgotpass = () => {
  return (
    
      <div className="card w-full max-w-md">
        <div className="card-body">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary mb-2">Forgot Password?</h1>
            <p className="text-base-content/80 mb-6">
              Enter your email address and we'll send you a reset link
            </p>
          </div>
          
          <form className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content">Email Address</span>
              </label>
              <input 
                type="email" 
                placeholder="your@email.com" 
                className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary w-full mt-6"
            >
              <Link to={"/code"}>Send</Link>
            </button>
            
            <div className="text-center mt-4">
              <p>
                Remember your password? <Link className='hover:underline text-primary' to={"/signin"}>Sign in</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
   
  );
};

export default Forgotpass;