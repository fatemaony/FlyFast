import Lottie from 'lottie-react';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../assets/Lottie/Hero.json';

const Banner = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const lines = [
    {
      text: "Fastest",
      span: "Delivery",
      rest: "& Easy Pickup",
      spanColor: "text-primary"
    },
    {
      text: "Delivery in",
      span: "30 Minutes",
      rest: "at your doorstep",
      spanColor: "text-secondary"
    },
    {
      text: "We Make Sure Your",
      span: "Parcel Arrives",
      rest: "On Time",
      spanColor: "text-accent"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % lines.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [lines.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  return (
    <div className='flex flex-col py-20 md:flex-row items-center justify-center min-h-[80vh] px-4 sm:px-8 lg:px-12 gap-8 md:gap-16'>
      {/* Fixed height container for text content */}
      <div className='flex-1 max-w-2xl h-[300px] md:h-[450px] flex flex-col justify-center'>
        <div>
          <AnimatePresence mode='wait'>
          <motion.div
            key={currentLine}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className='space-y-4'
          >
            <motion.h1 
              variants={itemVariants}
              className='text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight'
            >
              {lines[currentLine].text}{" "}
              <motion.span 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ 
                  scale: { 
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }
                }}
                className={`${lines[currentLine].spanColor} font-extrabold`}
              >
                {lines[currentLine].span}
              </motion.span>{" "}
              {lines[currentLine].rest}
            </motion.h1>
          </motion.div>
        </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className='text-lg mt-6 text-base-content/80'
        >
          Experience lightning-fast delivery services with real-time tracking and 24/7 support.
        </motion.p>

        <div>
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className='mt-8 flex gap-4'
        >
          <button className='btn btn-primary px-8 rounded-full'>
            Order Now
          </button>
          <button className='btn btn-outline px-8 rounded-full'>
            Learn More
          </button>
        </motion.div>
        </div>
      </div>

      {/* Fixed height container for Lottie animation */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className='flex-1 max-w-xl h-[300px] md:h-[400px]'
      >
        <Lottie 
          animationData={Hero} 
          loop={true}
          className='w-full h-full'
        />
      </motion.div>
    </div>
  );
};

export default Banner;