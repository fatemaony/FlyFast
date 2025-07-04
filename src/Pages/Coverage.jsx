import React, { useState, useMemo } from 'react';
import { useLoaderData } from 'react-router';
import { FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Coverage = () => {
  // Coordinates for Bangladesh center point
  const bangladeshCenter = [23.6850, 90.3563];
  const allWarehouses = useLoaderData();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter warehouses based on search term
  const filteredWarehouses = useMemo(() => {
    if (!searchTerm) return allWarehouses;
    const term = searchTerm.toLowerCase();
    return allWarehouses.filter(warehouse => 
      warehouse.district.toLowerCase().includes(term) ||
      warehouse.city.toLowerCase().includes(term) ||
      warehouse.region.toLowerCase().includes(term) ||
      warehouse.covered_area.some(area => area.toLowerCase().includes(term)))
  }, [allWarehouses, searchTerm]);

  // Handle case where data might not be loaded yet or is invalid
  if (!allWarehouses || !Array.isArray(allWarehouses)) {
    return (
      <div className="p-6 md:p-10 mt-15 bg-base-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-center text-primary mb-6"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Loading warehouse locations...
          </motion.h1>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 mt-15 bg-base-100 min-h-screen">
      {/* Title with animation */}
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center text-primary mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        We are available in {allWarehouses.length} districts
      </motion.h1>

      {/* Search box */}
      <div className="flex justify-center mb-8">
        <div className="form-control w-full max-w-md">
          <div className='flex justify-center'>
            <div className="input-group">
              <input
                type="text"
                placeholder="Search district..."
                className="input input-bordered w-96"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-square bg-primary text-white">
                <FaSearch />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Map of Bangladesh */}
      <div className="flex justify-center">
        <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
          <MapContainer 
            center={bangladeshCenter} 
            zoom={7} 
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Map through all warehouses and create markers */}
            {filteredWarehouses.map((warehouse, index) => (
              <Marker 
                key={`${warehouse.district}-${index}`} 
                position={[warehouse.latitude, warehouse.longitude]}
              >
                <Popup className="min-w-[200px]">
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg">{warehouse.district}</h3>
                    <div className="divider my-1"></div>
                    <p><span className="font-semibold">Region:</span> {warehouse.region}</p>
                    <p><span className="font-semibold">City:</span> {warehouse.city}</p>
                    <p><span className="font-semibold">Covered Areas:</span> {warehouse.covered_area.join(', ')}</p>
                    <p>
                      <span className="font-semibold">Status:</span> 
                      <span className={`ml-1 ${warehouse.status === 'active' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {warehouse.status}
                      </span>
                    </p>
                    {warehouse.flowchart && (
                      <a 
                        href={warehouse.flowchart} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="link link-primary text-sm"
                      >
                        View Flowchart
                      </a>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Coverage;