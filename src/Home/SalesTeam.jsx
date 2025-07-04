import React from 'react';
import { motion } from 'framer-motion';
import image1 from '../assets/brands/amazon.png';
import image2 from '../assets/brands/casio.png';
import image3 from '../assets/brands/moonstar.png';
import image4 from '../assets/brands/randstad.png';
import image5 from '../assets/brands/start.png';
import image6 from '../assets/brands/start-people 1.png';

const SalesTeam = () => {
  const brands = [
    { id: 1, image: image1, alt: "amazon" },
    { id: 2, image: image2, alt: "casio" },
    { id: 3, image: image3, alt: "moonstar" },
    { id: 4, image: image4, alt: "randstad" },
    { id: 5, image: image5, alt: "start" },
    { id: 6, image: image6, alt: "start-people" } // Changed id to 6
  ];

  const duplicatedBrands = [...brands, ...brands];

  return (
    <div className="py-16 bg-base-100 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            We've helped <span className="text-primary">thousands</span> of sales teams
          </h2>
          <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
            Trusted by leading brands worldwide to deliver exceptional results
          </p>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden">
          {/* First Marquee */}
          <motion.div
            className="flex items-center gap-12 md:gap-16 lg:gap-24 w-max"
            animate={{
              x: ['0%', '-100%'],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {duplicatedBrands.map((brand, index) => (
              <div 
                key={`first-${brand.id}-${index}`} // Added index to make key unique
                className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
              >
                <img 
                  src={brand.image} 
                  alt={brand.alt} 
                  className="h-6 md:h-8 lg:h-10 w-auto object-contain opacity-80 hover:opacity-100"
                />
              </div>
            ))}
          </motion.div>

          {/* Second Marquee */}
          <motion.div
            className="flex items-center gap-12 md:gap-16 lg:gap-24 w-max mt-8"
            animate={{
              x: ['-100%', '0%'],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {duplicatedBrands.map((brand, index) => (
              <div 
                key={`second-${brand.id}-${index}`} // Added index to make key unique
                className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
              >
                <img 
                  src={brand.image} 
                  alt={brand.alt} 
                  className="h-4 md:h-5 lg:h-7 w-auto object-contain opacity-80 hover:opacity-100"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SalesTeam;