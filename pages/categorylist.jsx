import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import SubcategoryCard from '../components/SubcategoryCard';
import { productCategories } from '../data/productData';

const ProductCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const category = productCategories.find(cat => cat.id === categoryId);

  if (!category) {
    return (
      <div className="section container-custom pt-32 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Category Not Found</h2>
        <p className="mb-8">The product category you're looking for doesn't exist.</p>
        <Link to="/products" className="btn-primary">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section 
        className="relative py-20 bg-gray-900"
        style={{
          backgroundImage: `url('${category.image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="container-custom relative z-10">
          <button 
            className="inline-flex items-center text-white mb-6 hover:text-primary-300 transition"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={20} className="mr-1" />
            Back
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{category.name}</h1>
            <p className="text-xl text-gray-200 max-w-3xl">
              {category.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Subcategories */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-gray-900 mb-12 text-center"
          >
            {category.name} Categories
          </motion.h2>

          {category.subcategories && category.subcategories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.subcategories.map((subcategory, index) => (
                <SubcategoryCard
                  key={subcategory.id}
                  subcategory={subcategory}
                  categoryId={category.id}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No subcategories available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Related Categories */}
      <section className="section bg-white">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Explore Other Categories</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {productCategories
              .filter(cat => cat.id !== categoryId)
              .slice(0, 4)
              .map((cat, index) => (
                <Link
                  key={cat.id}
                  to={`/products/${cat.id}`}
                  className="group"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative h-40 rounded-lg overflow-hidden"
                  >
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <h3 className="text-white font-semibold text-lg text-center px-2">{cat.name}</h3>
                    </div>
                  </motion.div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductCategory;
