import React, { useState } from 'react';
import { FaHistory, FaBullseye, FaTrophy, FaUsers, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Contact from '../Component/Contact';

const About = () => {
  const [activeTab, setActiveTab] = useState('story');
  const [expandedSections, setExpandedSections] = useState({
    story: false,
    mission: false,
    success: false,
    team: false
  });

  const toggleExpand = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const tabs = [
    { id: 'story', label: 'Story', icon: <FaHistory className="mr-2" /> },
    { id: 'mission', label: 'Mission', icon: <FaBullseye className="mr-2" /> },
    { id: 'success', label: 'Success', icon: <FaTrophy className="mr-2" /> },
    { id: 'team', label: 'Team & Others', icon: <FaUsers className="mr-2" /> },
  ];

  const sectionContent = {
    story: {
      brief: "Founded in 2015, we started as a small local delivery service with just two bikes and a dream.",
      full: [
        "Founded in 2015 by two college friends, we started as a small local delivery service with just two bikes and a dream.",
        "Our first year was challenging, delivering packages rain or shine across the city. Word of our reliable service spread quickly.",
        "By 2018, we expanded to three cities and introduced our real-time tracking system, revolutionizing how customers interacted with deliveries.",
        "Today, we operate nationwide with a fleet of over 500 vehicles and a team of dedicated professionals.",
        "What hasn't changed is our commitment to treating every package as if it were our own."
      ]
    },
    mission: {
      brief: "To revolutionize the delivery industry by providing fast, transparent services.",
      full: [
        "Our mission is to revolutionize the delivery industry by providing fast, transparent, and customer-focused services.",
        "We believe every package tells a story - whether it's a student receiving textbooks, a small business shipping products, or families exchanging gifts.",
        "Our three core principles:",
        "1. Speed without compromising safety",
        "2. Complete transparency in tracking",
        "3. Personalized customer service",
        "We've built our technology and trained our team around these values, ensuring we deliver more than just packages - we deliver peace of mind."
      ]
    },
    success: {
      brief: "1 million+ successful deliveries with a 98.7% on-time rate.",
      full: [
        "With over 1 million successful deliveries and a 98.7% on-time rate, we've earned the trust of thousands of customers.",
        "Our milestones:",
        "• 2016: Delivered our 10,000th package",
        "• 2018: Launched our award-winning tracking app",
        "• 2020: Recognized as 'Most Reliable Service' by Logistics Magazine",
        "• 2022: Expanded to nationwide coverage",
        "• 2023: Reached 1 million deliveries",
        "Our success comes from our passionate team and cutting-edge tracking technology that provides real-time updates and predictive delivery times."
      ]
    },
    team: {
      brief: "200+ professionals building the future of logistics.",
      full: [
        "Our team of 200+ professionals includes delivery experts, customer service specialists, and tech innovators.",
        "Leadership Team:",
        "• Sarah Chen - Founder & CEO",
        "• Jamal Williams - COO",
        "• Priya Patel - Head of Technology",
        "• Carlos Mendez - Customer Experience Director",
        "Our delivery personnel undergo rigorous training in safe handling, customer service, and efficient routing.",
        "The tech team continuously improves our systems with features like photo confirmation, temperature-controlled tracking, and AI-powered route optimization.",
        "Together, we're building the future of logistics with a human touch that keeps customers at the center of everything we do."
      ]
    }
  };

  return (
    <div className="py-20 px-8 lg:px-20 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 font-aladin">
          About Us
        </h1>
        <p className="text-lg text-base-content max-w-3xl mx-auto">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
        </p>
      </motion.div>

      <div className="divider divider-primary my-8"></div>

      <div className="flex flex-col items-center">
        <div className="tabs tabs-boxed bg-base-200 p-1 rounded-box mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab tab-lg ${activeTab === tab.id ? 'tab-active !bg-primary !text-primary-content' : ''}`}
            >
              <span className="flex items-center">
                {tab.icon}
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full bg-base-100 rounded-box p-8 shadow-lg border border-base-300"
        >
          <h2 className="text-2xl font-bold text-primary mb-4">
            Our {tabs.find(t => t.id === activeTab)?.label}
          </h2>
          
          <p className="text-base-content mb-4">
            {sectionContent[activeTab].brief}
          </p>
          
          {expandedSections[activeTab] && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-4">
                {sectionContent[activeTab].full.map((paragraph, index) => (
                  <p key={index} className="text-base-content">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          )}
          
          <button
            onClick={() => toggleExpand(activeTab)}
            className="btn btn-ghost mt-4 text-primary hover:bg-primary hover:text-primary-content"
          >
            {expandedSections[activeTab] ? (
              <>
                <FaChevronUp className="mr-2" />
                Read Less
              </>
            ) : (
              <>
                <FaChevronDown className="mr-2" />
                Read More
              </>
            )}
          </button>
        </motion.div>
      </div>

      <Contact></Contact>
    </div>
  );
};

export default About;