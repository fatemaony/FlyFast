import React from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiCalendar, FiMail, FiPhone, FiMapPin, FiCreditCard, FiHome } from 'react-icons/fi';
import { FaMotorcycle, FaBicycle } from 'react-icons/fa';
import { useLoaderData } from 'react-router';
import { useForm } from "react-hook-form";

const Rider = () => {
  const warehouse = useLoaderData();
  const { district } = warehouse;
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: '',
      nidNumber: '',
      age: '',
      gender: '',
      email: '',
      phone: '',
      address: '',
      warehouse: '',
      vehicle: ''
    }
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 py-20 px-4 sm:px-6 lg:px-25"
    >
      <div className="max-w-6xl mx-auto"> 
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl font-bold text-primary mb-4 flex items-center justify-center gap-3"
          >
            <FaMotorcycle className="text-5xl" />
            <span>Be a Rider</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-base-content/80 max-w-2xl mx-auto"
          >
            Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. 
            From personal packages to business shipments — we deliver on time, every time.
          </motion.p>
        </div>

        {/* Form Section - 2 Column Layout */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="card bg-base-100 shadow-xl p-6 sm:p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            
              <div className="space-y-6">
                
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-primary border-b pb-2">Personal Information</h3>
                  
                  <div className='grid lg:grid-cols-2 gap-4 grid-cols-1'>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text flex items-center gap-2">
                          <FiUser /> Full Name
                        </span>
                      </label>
                      <input
                        {...register("fullName", { required: "Full name is required" })}
                        type="text"
                        placeholder="Enter your full name"
                        className={`input input-bordered w-full ${errors.fullName ? 'input-error' : ''}`}
                      />
                      {errors.fullName && (
                        <label className="label">
                          <span className="label-text-alt text-error">{errors.fullName.message}</span>
                        </label>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text flex items-center gap-2">
                          <FiCreditCard /> NID Number
                        </span>
                      </label>
                      <input
                        {...register("nidNumber", { 
                          required: "NID number is required",
                          pattern: {
                            value: /^[0-9]{10,17}$/,
                            message: "Enter a valid NID number"
                          }
                        })}
                        type="text"
                        placeholder="Enter your National ID number"
                        className={`input input-bordered w-full ${errors.nidNumber ? 'input-error' : ''}`}
                      />
                      {errors.nidNumber && (
                        <label className="label">
                          <span className="label-text-alt text-error">{errors.nidNumber.message}</span>
                        </label>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text flex items-center gap-2">
                          <FiCalendar /> Age
                        </span>
                      </label>
                      <input
                        {...register("age", { 
                          required: "Age is required",
                          min: {
                            value: 18,
                            message: "You must be at least 18 years old"
                          },
                          max: {
                            value: 65,
                            message: "Maximum age is 65"
                          }
                        })}
                        type="number"
                        placeholder="Your age"
                        className={`input input-bordered w-full ${errors.age ? 'input-error' : ''}`}
                      />
                      {errors.age && (
                        <label className="label">
                          <span className="label-text-alt text-error">{errors.age.message}</span>
                        </label>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Gender</span>
                      </label>
                      <select
                        {...register("gender", { required: "Gender is required" })}
                        className={`select select-bordered w-full ${errors.gender ? 'select-error' : ''}`}
                      >
                        <option value="" disabled>Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.gender && (
                        <label className="label">
                          <span className="label-text-alt text-error">{errors.gender.message}</span>
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-6 pt-4">
                  <h3 className="text-xl font-semibold text-primary border-b pb-2">Contact Information</h3>
                  
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text flex items-center gap-2">
                          <FiMail /> Email
                        </span>
                      </label>
                      <input
                        {...register("email", { 
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                          }
                        })}
                        type="email"
                        placeholder="your.email@example.com"
                        className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                      />
                      {errors.email && (
                        <label className="label">
                          <span className="label-text-alt text-error">{errors.email.message}</span>
                        </label>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text flex items-center gap-2">
                          <FiPhone /> Phone
                        </span>
                      </label>
                      <input
                        {...register("phone", { 
                          required: "Phone number is required",
                          pattern: {
                            value: /^\+?[0-9]{11,14}$/,
                            message: "Invalid phone number"
                          }
                        })}
                        type="tel"
                        placeholder="+880 1XXX XXXXXX"
                        className={`input input-bordered w-full ${errors.phone ? 'input-error' : ''}`}
                      />
                      {errors.phone && (
                        <label className="label">
                          <span className="label-text-alt text-error">{errors.phone.message}</span>
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>

             
              <div className="space-y-6">
                {/* Address Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-primary border-b pb-2">Address Information</h3>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2">
                        <FiMapPin /> Full Address
                      </span>
                    </label>
                    <textarea
                      {...register("address", { required: "Address is required" })}
                      placeholder="House# Road#, Area, City"
                      className={`textarea textarea-bordered w-full h-32 ${errors.address ? 'textarea-error' : ''}`}
                    />
                    {errors.address && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.address.message}</span>
                      </label>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2">
                        <FiHome /> Preferred Warehouse
                      </span>
                    </label>
                    <select
                      {...register("warehouse", { required: "Warehouse selection is required" })}
                      className={`select select-bordered w-full ${errors.warehouse ? 'select-error' : ''}`}
                    >
                      <option value="" disabled>Select nearest warehouse</option>
                      {warehouse?.map((wh) => (
                        <option key={district} value={wh.id}>{wh.district}</option>
                      ))}
                    </select>
                    {errors.warehouse && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.warehouse.message}</span>
                      </label>
                    )}
                  </div>
                </div>

                {/* Vehicle Information */}
                <div className="space-y-6 pt-4">
                  <h3 className="text-xl font-semibold text-primary border-b pb-2">Vehicle Information</h3>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Preferred Vehicle</span>
                    </label>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          {...register("vehicle", { required: "Vehicle selection is required" })}
                          type="radio"
                          value="motorcycle"
                          className="radio radio-primary"
                        />
                        <span className="flex items-center gap-2">
                          <FaMotorcycle /> Motorcycle
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          {...register("vehicle")}
                          type="radio"
                          value="bicycle"
                          className="radio radio-primary"
                        />
                        <span className="flex items-center gap-2">
                          <FaBicycle /> Bicycle
                        </span>
                      </label>
                    </div>
                    {errors.vehicle && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.vehicle.message}</span>
                      </label>
                    )}
                  </div>
                </div>

                {/* Submit Button - Full width in right column */}
                <div className="pt-6">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn btn-primary w-full py-3 text-lg"
                  >
                    Join Our Rider Team
                  </motion.button>
                </div>
              </div>
           
          </form>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="card bg-base-100 shadow-md p-6">
            <div className="text-primary text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-2">Competitive Earnings</h3>
            <p className="text-base-content/70">Earn more with our attractive commission rates and bonuses.</p>
          </div>
          <div className="card bg-base-100 shadow-md p-6">
            <div className="text-primary text-4xl mb-4">⏱️</div>
            <h3 className="text-xl font-semibold mb-2">Flexible Hours</h3>
            <p className="text-base-content/70">Work when you want - full-time or part-time opportunities.</p>
          </div>
          <div className="card bg-base-100 shadow-md p-6">
            <div className="text-primary text-4xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-2">Easy-to-Use App</h3>
            <p className="text-base-content/70">Our rider app makes deliveries simple and efficient.</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Rider;