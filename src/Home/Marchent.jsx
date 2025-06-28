import React from 'react';
import { motion } from 'framer-motion';
import vector from '../assets/Vector.png';

const Merchant = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 to-secondary/10 py-16 md:py-24">
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 rounded-full bg-secondary/20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-accent/20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="flex-1 space-y-6"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Merchant and Customer <span className="text-primary">Satisfaction</span> is Our First Priority
            </h1>
            
            <p className="text-lg text-base-content/80 max-w-2xl">
              We offer the lowest delivery charge with the highest value along with 100% safety of your product. 
              Pathao courier delivers your parcels in every corner of Bangladesh right on time.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary px-8 rounded-full shadow-lg"
              >
                Become a Merchant
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-outline btn-secondary px-8 rounded-full border-2 shadow-lg"
              >
                Earn with Profast Courier
              </motion.button>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1"
          >
            <img 
              src={vector} 
              alt="Delivery illustration" 
              className="w-full h-auto max-w-xl mx-auto hover:scale-105 transition-transform duration-300"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Merchant;