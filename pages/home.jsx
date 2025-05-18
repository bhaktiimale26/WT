import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { productCategories } from '../data/productData';
import ServiceCards from '../components/Services';

const Home = () => {
  // Filter out Appliances for homepage display
  const displayCategories = productCategories.filter(
    (cat) => cat.id !== 'appliances'
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      {/* Products Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Products
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover our comprehensive range of high-quality electrical
              products and solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayCategories.map((category, index) => (
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

      <section className="section bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
        </motion.div>
        <div className="container-custom">
          <ServiceCards />
        </div>
      </section>

      {/* About Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="About Ajit Power"
                className="rounded-lg shadow-lg w-full"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                About DS Cables
              </h2>
              <p className="text-gray-600">
                DS CablesSolutions Private Limited is a leading distributor of
                electrical products in India. As an authorized distributor of
                Polycab India Ltd., we provide a comprehensive range of
                high-quality electrical solutions.
              </p>
              <p className="text-gray-600">
                With years of experience in the industry, we have established
                ourselves as a trusted partner for electrical contractors,
                builders, and industrial clients. Our commitment to quality and
                customer satisfaction sets us apart.
              </p>
              <div className="pt-4">
                <Link to="/about" className="btn-secondary">
                  Learn More About Us
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary-800 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Need Electrical Solutions?
            </h2>
            <p className="text-xl text-primary-100">
              Get in touch with our team of experts to find the perfect products
              for your needs.
            </p>
            <div className="pt-4">
              <Link
                to="/contact"
                className="btn bg-white text-primary-800 hover:bg-gray-100"
              >
                Contact Us Today
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
