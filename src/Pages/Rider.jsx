import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiCalendar, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaMotorcycle, FaBicycle } from 'react-icons/fa';

const Rider = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    phone: '',
    address: '',
    vehicle: 'bike'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
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

        {/* Form Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="card bg-base-100 shadow-xl p-6 sm:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <FiUser /> Full Name
                </span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Age and Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <FiCalendar /> Your Age
                  </span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter your age"
                  min="18"
                  max="60"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Gender</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="" disabled>Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <FiMail /> Email
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <FiPhone /> Phone
                  </span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <FiMapPin /> Address
                </span>
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your full address"
                className="textarea textarea-bordered w-full"
                rows="3"
                required
              />
            </div>

            {/* Vehicle Type */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Preferred Vehicle</span>
              </label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="vehicle"
                    value="bike"
                    checked={formData.vehicle === 'bike'}
                    onChange={handleChange}
                    className="radio radio-primary"
                  />
                  <span className="flex items-center gap-2">
                    <FaMotorcycle /> Motorcycle
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="vehicle"
                    value="bicycle"
                    checked={formData.vehicle === 'bicycle'}
                    onChange={handleChange}
                    className="radio radio-primary"
                  />
                  <span className="flex items-center gap-2">
                    <FaBicycle /> Bicycle
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn btn-primary w-full mt-8 py-3 text-lg"
            >
              Join Our Rider Team
            </motion.button>
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