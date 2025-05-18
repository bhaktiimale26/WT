
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Download } from 'lucide-react';
import { catalogueData } from '../data/productData';
import ProductCard from '../components/ProductCard';

const Catalogue = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter catalogue categories by search term
  const filteredCategories = catalogueData.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
    
  );

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-primary-900 text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Product Catalogues</h1>
            <p className="text-xl text-primary-100 mb-8">
              Browse and download detailed catalogues for our entire product range
            </p>

            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search catalogues..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Catalogue List */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No catalogues found for "{searchTerm}"</p>
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 btn-secondary"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCategories.map((category, index) => (
                <ProductCard
                  key={index}
                  id={index.toString()}
                  name={category.title}
                  description={`Browse and download ${category.title} catalogues`}
                  image={category.image}
                  link={`/catalogue/${index}`}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Downloads */}
      <section className="section bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Featured Catalogues</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-primary-50 rounded-lg p-6 flex flex-col justify-between h-full"
            >
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-3">Complete Product Catalogue 2023</h3>
                <p className="text-primary-700 mb-4">
                  Comprehensive catalogue featuring our entire product range with detailed specifications and applications.
                </p>
              </div>
              <a
                href="#"
                className="inline-flex items-center font-medium text-primary-600 hover:text-primary-700 transition"
              >
                <Download size={18} className="mr-2" />
                Download Catalogue (PDF, 15MB)
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-accent-50 rounded-lg p-6 flex flex-col justify-between h-full"
            >
              <div>
                <h3 className="text-xl font-semibold text-accent-900 mb-3">Technical Data Sheet Bundle</h3>
                <p className="text-accent-700 mb-4">
                  Collection of technical data sheets with detailed specifications for engineers and technical consultants.
                </p>
              </div>
              <a
                href="#"
                className="inline-flex items-center font-medium text-accent-600 hover:text-accent-700 transition"
              >
                <Download size={18} className="mr-2" />
                Download Bundle (ZIP, 8MB)
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Catalogue;
