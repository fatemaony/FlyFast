import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiStar, FiTruck, FiMapPin } from 'react-icons/fi';

const Counting = () => {
  const [counts, setCounts] = useState({
    users: 0,
    reviews: 0,
    riders: 0,
    areas: 0
  });

  const targetCounts = {
    users: 10000,
    reviews: 5000,
    riders: 1500,
    areas: 120
  };

  const duration = 5; 

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const animateCount = () => {
      const now = Date.now();
      const progress = Math.min(1, (now - startTime) / (duration * 1000));

      setCounts({
        users: Math.floor(progress * targetCounts.users),
        reviews: Math.floor(progress * targetCounts.reviews),
        riders: Math.floor(progress * targetCounts.riders),
        areas: Math.floor(progress * targetCounts.areas)
      });

      if (now < endTime) {
        requestAnimationFrame(animateCount);
      } else {
        // Ensure final numbers are exact
        setCounts(targetCounts);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(animateCount);
    }, 500); // Small delay before starting

    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { 
      icon: <FiUsers className="text-3xl" />,
      title: "Users", 
      value: counts.users,
      suffix: "+",
      color: "text-primary"
    },
    { 
      icon: <FiStar className="text-3xl" />,
      title: "Reviews", 
      value: counts.reviews,
      suffix: "+",
      color: "text-secondary"
    },
    { 
      icon: <FiTruck className="text-3xl" />,
      title: "Riders", 
      value: counts.riders,
      suffix: "+",
      color: "text-accent"
    },
    { 
      icon: <FiMapPin className="text-3xl" />,
      title: "Areas", 
      value: counts.areas,
      suffix: "+",
      color: "text-success"
    }
  ];

  return (
    <div className="py-16 bg-base-200">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-base-100 rounded-xl p-6 shadow-lg text-center"
            >
              <div className={`${stat.color} mb-4 flex justify-center`}>
                {stat.icon}
              </div>
              <motion.div 
                className={`text-4xl font-bold ${stat.color} mb-2`}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 100 }}
              >
                {stat.value.toLocaleString()}{stat.suffix}
              </motion.div>
              <h3 className="text-lg font-medium text-base-content">{stat.title}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Counting;