import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { productCategories } from '../data/productData';

const Products = () => {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Products</h1>
            <p className="text-xl text-primary-100">
              Discover our comprehensive range of high-quality electrical products
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Products List */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCategories.map((category, index) => (
              <ProductCard
                key={category.id}
                id={category.id}
                name={category.name}
                description={category.description}
                image={category.image}
                link={`/products/${category.id}`}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="bg-primary-50 rounded-xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-4">Need Help Choosing the Right Products?</h2>
              <p className="text-lg text-primary-700 mb-8">
                Our team of experts is here to help you find the perfect solutions for your specific requirements.
              </p>
              <Link to="/contact" className="btn-primary">
                Contact Our Experts
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
