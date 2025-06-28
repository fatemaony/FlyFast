import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarCheck, FaTruckPickup, FaMoneyBillWave, FaWarehouse, FaBuilding, FaRecycle } from 'react-icons/fa';

const steps = [
  {
    title: 'Booking',
    icon: <FaCalendarCheck className="text-4xl text-secondary" />,
    description: 'Schedule your delivery quickly with our simple booking system.',
  },
  {
    title: 'Pick & Drop',
    icon: <FaTruckPickup className="text-4xl text-secondary" />,
    description: 'We ensure safe and timely pickup and drop-off of your packages.',
  },
  {
    title: 'Cash On Delivery',
    icon: <FaMoneyBillWave className="text-4xl text-secondary" />,
    description: 'Pay only after your order is safely delivered to your doorstep.',
  },
  {
    title: 'Delivery Hub',
    icon: <FaWarehouse className="text-4xl text-secondary" />,
    description: 'Our network of delivery hubs ensures fast and efficient service.',
  },
  {
    title: 'SME & Corporate',
    icon: <FaBuilding className="text-4xl text-secondary" />,
    description: 'Tailored logistics solutions for businesses, big or small.',
  },
  {
    title: 'Return Services',
    icon: <FaRecycle className="text-4xl text-secondary" />,
    description: 'Easy return service for customer satisfaction and trust.',
  },
];

const HowItWork = () => {
  return (
    <div className="py-16 bg-base-100">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-primary mb-4">How It Works</h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Discover how our logistics platform simplifies delivery and booking processes for customers and businesses.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12">
        {steps.map((step, index) => (
          <motion.div
  key={index}
  className="card bg-white rounded-2xl shadow-xl hover:shadow-2xl hover:bg-primary/10 transition-all duration-300 p-6 cursor-pointer"
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: index * 0.1 }}
>
  <div className="flex items-center justify-center mb-4">
    {step.icon}
  </div>
  <h3 className="text-xl font-bold text-primary text-center mb-2">{step.title}</h3>
  <p className="text-gray-400 text-center">{step.description}</p>
</motion.div>

        ))}
      </div>
    </div>
  );
};

export default HowItWork;
