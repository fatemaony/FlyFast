import React from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiCamera, FiEye, FiEyeOff, FiUpload } from 'react-icons/fi';
import { CgProfile } from "react-icons/cg";
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../Hook/useAuth';
import Swal from 'sweetalert2';

const SignUp = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";
  const { createUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const showSuccessAlert = () => {
    Swal.fire({
      title: 'Account Created!',
      text: 'Your account has been successfully created!',
      icon: 'success',
      confirmButtonText: 'Continue',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false
    });
  };

  const onSubmit = (data) => { 
    console.log(data);
    createUser(data.email, data.password)
      .then(result => {
        console.log(result.user);
        showSuccessAlert();
        navigate(from, { replace: true });
      })
      .catch(error => {
        console.log(error);
        Swal.fire({
          title: 'Error!',
          text: getErrorMessage(error.code),
          icon: 'error',
          confirmButtonText: 'Try Again'
        });
      });
  };

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'This email is already in use. Please use a different email.';
      case 'auth/invalid-email':
        return 'Invalid email address format.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection.';
      default:
        return 'An error occurred during sign up. Please try again.';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='px-5'
    >
      <div className="text-center">
        <motion.h1 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="text-3xl font-bold text-primary mb-2"
        >
          Create Your Account
        </motion.h1>
        <p className="text-base-content/70">Join our community today</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        {/* Name Field */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="form-control"
        >
          <label className="label">
            <span className="label-text flex items-center gap-2">
              <FiUser className="text-primary" /> Full Name
            </span>
          </label>
          <input
            type="text"
            placeholder="John Doe"
            className={`input input-bordered w-full focus:ring-2 focus:ring-primary ${
              errors.name ? 'input-error' : ''
            }`}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <span className="text-error text-sm mt-1">{errors.name.message}</span>
          )}
        </motion.div>

        {/* Email Field */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
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
          transition={{ delay: 0.4 }}
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
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                  message: "Password must be at least 6 characters and include uppercase, lowercase, and a number"
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
        </motion.div>

        {/* Profile Photo Upload */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="form-control"
        >
          <label className="label">
            <span className="label-text flex items-center gap-2">
              <CgProfile className="text-primary" /> Photo URL
            </span>
          </label>
          <input
            type="url"
            placeholder="Paste your profile picture URL"
            className={`input input-bordered w-full focus:ring-2 focus:ring-primary ${
              errors.photo ? 'input-error' : ''
            }`}
            {...register("photo", { 
              required: "Profile photo is required",
              pattern: {
                value: /^(https?:\/\/).+$/i,
                message: "Please enter a valid URL starting with http:// or https://"
              }
            })}
          />
          {errors.photo && (
            <span className="text-error text-sm mt-1">{errors.photo.message}</span>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="pt-2"
        >
          <button
            type="submit"
            className="btn btn-primary w-full rounded-lg hover:shadow-md hover:shadow-primary/30"
          >
            Create Account
          </button>
        </motion.div>
      </form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center text-sm mt-6"
      >
        <span className="text-base-content/70">Already have an account? </span>
        <Link to={"/signin"} className="link link-primary font-medium">Sign in</Link>
      </motion.div>
    </motion.div>
  );
};

export default SignUp;