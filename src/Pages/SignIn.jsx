import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../Hook/useAuth';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signInWithGoogle, SignInUser } = useAuth();
  
  // Navigation setup
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError('');
    setLoading(true);
    
    try {
      const result = await SignInUser(data.email, data.password);
      console.log('Sign in successful:', result.user);
      
      // Show SweetAlert on success
      await Swal.fire({
        title: 'Success!',
        text: 'You have successfully signed in!',
        icon: 'success',
        confirmButtonText: 'Continue',
        timer: 2000,
        timerProgressBar: true,
      });
      
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Sign in error:', error);
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    
    try {
      const result = await signInWithGoogle();
      console.log('Google sign in successful:', result.user);
      
      // Show SweetAlert on success
      await Swal.fire({
        title: 'Success!',
        text: 'You have successfully signed in with Google!',
        icon: 'success',
        confirmButtonText: 'Continue',
        timer: 2000,
        timerProgressBar: true,
      });
      
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Google sign in error:', error);
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/invalid-email':
        return 'Invalid email address format.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection.';
      default:
        return 'An error occurred during sign in. Please try again.';
    }
  };

  return (
    <div className="card-body p-6 md:p-8">
      <div className="text-center mb-2">
        <motion.h1 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="text-3xl md:text-4xl font-bold text-primary mb-2"
        >
          Welcome Back!
        </motion.h1>
        <p className="text-base-content/70">Sign in to access your account</p>
      </div>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="alert alert-error mb-2"
        >
          <span className="text-sm">{error}</span>
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="form-control"
          >
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <FiMail className="text-primary" /> Email Address
              </span>
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              className={`input input-bordered w-full focus:ring-2 focus:ring-primary ${
                errors.email ? 'input-error' : ''
              }`}
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
            />
            {errors.email && (
              <span className="text-error text-sm mt-1">{errors.email.message}</span>
            )}
          </motion.div>

          {/* Password Field */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="form-control"
          >
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <FiLock className="text-primary" /> Password
              </span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`input input-bordered w-full pr-10 focus:ring-2 focus:ring-primary ${
                  errors.password ? 'input-error' : ''
                }`}
                {...register("password", { 
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/50 hover:text-primary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && (
              <span className="text-error text-sm mt-1">{errors.password.message}</span>
            )}
            <div className="label">
              <Link to={"/forgotPass"} className="label-text-alt link link-hover text-primary">
                Forgot password?
              </Link>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full rounded-lg hover:shadow-md hover:shadow-primary/30 transition-all"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                'Sign In'
              )}
            </button>
          </motion.div>
        </div>
      </form>

      {/* Divider and Google Sign In */}
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="divider text-sm text-base-content/50"
        >
          OR
        </motion.div>
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="btn btn-outline w-full rounded-lg border-base-300 hover:bg-base-200 flex items-center justify-center"
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <>
              <FcGoogle className="text-lg" />
              <span>Continue with Google</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Sign Up Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center text-sm mt-1"
      >
        <span className="text-base-content/70">Don't have an account? </span>
        <Link to="/signup" className="link link-primary font-medium hover:underline">
          Sign Up
        </Link>
      </motion.div>
    </div>
  );
};

export default SignIn;