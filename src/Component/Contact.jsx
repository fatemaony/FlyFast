import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-aladin">
          Get In Touch
        </h1>
        <p className="text-lg text-base-content max-w-2xl mx-auto">
          Have questions or need assistance? We're here to help! Reach out to us through any of these channels.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-base-100 p-8 rounded-box shadow-lg border border-base-300"
        >
          <h2 className="text-2xl font-bold text-primary mb-6">Contact Information</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="p-3 rounded-full bg-primary/10 text-primary mr-4">
                <FaPhone className="text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Phone</h3>
                <p className="text-base-content">+1 (555) 123-4567</p>
                <p className="text-sm text-base-content/70">Mon-Fri, 9am-6pm</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="p-3 rounded-full bg-secondary/10 text-secondary mr-4">
                <FaEnvelope className="text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Email</h3>
                <p className="text-base-content">support@deliveryapp.com</p>
                <p className="text-sm text-base-content/70">Response within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="p-3 rounded-full bg-accent/10 text-accent mr-4">
                <FaMapMarkerAlt className="text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Office</h3>
                <p className="text-base-content">123 Delivery Street</p>
                <p className="text-base-content">Suite 400, San Francisco, CA 94107</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-base-100 p-8 rounded-box shadow-lg border border-base-300"
        >
          <h2 className="text-2xl font-bold text-primary mb-6">Send Us a Message</h2>
          
          <form className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content">Your Name</span>
              </label>
              <input 
                type="text" 
                placeholder="John Doe" 
                className="input input-bordered w-full bg-base-200 focus:border-primary focus:ring-1 focus:ring-primary" 
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content">Email Address</span>
              </label>
              <input 
                type="email" 
                placeholder="john@example.com" 
                className="input input-bordered w-full bg-base-200 focus:border-primary focus:ring-1 focus:ring-primary" 
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content">Subject</span>
              </label>
              <select className="select select-bordered w-full bg-base-200 focus:border-primary focus:ring-1 focus:ring-primary">
                <option disabled selected>Select a subject</option>
                <option>Delivery Inquiry</option>
                <option>Tracking Help</option>
                <option>Business Partnership</option>
                <option>Feedback</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content">Message</span>
              </label>
              <textarea 
                placeholder="Your message here..." 
                rows="4" 
                className="textarea textarea-bordered w-full bg-base-200 focus:border-primary focus:ring-1 focus:ring-primary"
              ></textarea>
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                className="btn btn-primary w-full"
              >
                <FaPaperPlane className="mr-2" />
                Send Message
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Map Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-16 bg-base-100 rounded-box shadow-lg overflow-hidden border border-base-300"
      >
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.681156366852!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus" 
          width="100%" 
          height="400" 
          style={{ border: 0 }}
          allowFullScreen="" 
          loading="lazy"
          title="Our Location"
          className="rounded-box"
        ></iframe>
      </motion.div>
    </div>
  );
};

export default Contact;