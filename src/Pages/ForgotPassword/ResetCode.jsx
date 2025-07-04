import React, { useState } from 'react';
import { Link } from 'react-router';

const ResetCode = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      
      // Auto focus to next input
      if (value && index < 5) {
        document.getElementById(`code-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      document.getElementById(`code-input-${index - 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullCode = code.join('');
    console.log('Verification code:', fullCode);
    // Add your verification logic here
  };

  return (
   
      <div className="card w-full max-w-md">
        <div className="card-body">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary mb-2">Enter Verification Code</h1>
            <p className="text-base-content/80 mb-6">
              We've sent a 6-digit code to your email address
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center space-x-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-input-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="input input-bordered w-12 h-12 text-center text-xl focus:ring-2 focus:ring-primary"
                  autoFocus={index === 0}
                />
              ))}
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary w-full mt-6"
              disabled={code.some(digit => digit === '')}
            >
              <Link to={"/resetPass"}>Verify Code</Link>
            </button>
            
            <div className="text-center">
              <p className="text-sm text-base-content/70">
                Didn't receive a code?{' '}
                <a 
                  href="#" 
                  className="link link-hover text-secondary hover:text-secondary-focus font-medium"
                >
                  Resend
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
  
  );
};

export default ResetCode;