import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Download, Send, BadgeCheck } from 'lucide-react';
import { productCategories } from '../data/productData';

const ProductDetail = () => {
  const { categoryId, subcategoryId, productId, specificationId } = useParams();
  const navigate = useNavigate();

  const category = productCategories.find((cat) => cat.id === categoryId);
  const subcategory = category?.subcategories?.find(
    (sub) => sub.id === subcategoryId
  );
  const productType = subcategory?.types?.find((type) => type.id === productId);
  const specification = specificationId 
    ? productType?.products?.find((prod) => prod.id === specificationId)
    : null;

  if (!category || !subcategory || !productType) {
    return (
      <div className="section container-custom pt-32 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-8">The product you're looking for doesn't exist.</p>
        <Link to="/products" className="btn-primary">
          Back to Products
        </Link>
      </div>
    );
  }

  if (specificationId && !specification) {
    return (
      <div className="section container-custom pt-32 text-center">
        <h2 className="text-2xl font-bold mb-4">Specification Not Found</h2>
        <p className="mb-8">The specification you're looking for doesn't exist.</p>
        <button onClick={() => navigate(-1)} className="btn-primary">
          Go Back
        </button>
      </div>
    );
  }

  if (specification) {
    return (
      <div className="pt-20">
        <section className="bg-white py-10">
          <div className="container-custom">
            <button
              className="inline-flex items-center text-gray-700 mb-6 hover:text-primary-600 transition"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft size={20} className="mr-1" />
              Back
            </button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white"
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-primary-800">
                  {specification.title}
                </h1>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                <div className="col-span-1 flex justify-center">
                  <img
                    className="w-72 object-contain"
                    src={specification.image.src}
                    alt={specification.image.alt}
                  />
                </div>

                <div className="col-span-2">
                  <div className="space-y-4 text-gray-700">
                    {specification.description.map((desc, index) => (
                      <p key={index}>{desc}</p>
                    ))}
                  </div>

                  <div className="mt-8">
                    <h4 className="text-xl font-semibold text-primary-700 mb-4">
                      Technical Advantages
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-800">
                      {specification.technicalAdvantages.map((advantage, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <BadgeCheck className="text-primary-600 mt-1" />
                          <span>{advantage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <a
                      href={specification.links.catalogue.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex items-center"
                    >
                      <Download size={18} className="mr-2" />
                      {specification.links.catalogue.text}
                    </a>

                    <a
                      href={specification.links.enquiry.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary inline-flex items-center"
                    >
                      <Send size={18} className="mr-2" />
                      {specification.links.enquiry.text}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <section className="bg-white py-10">
        <div className="container-custom">
          <button
            className="inline-flex items-center text-gray-700 mb-6 hover:text-primary-600 transition"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={20} className="mr-1" />
            Back
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="order-2 md:order-1"
            >
              <div className="mb-4">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {productType.name}
                </h1>

                <div className="bg-gray-100 p-6 rounded-lg mb-8">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {productType.description}
                  </p>

                  {productType.specifications && productType.specifications.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Available Types:
                      </h3>
                      <ul className="space-y-2">
                        {productType.specifications.map((spec, index) => (
                          <li key={index}>
                            <Link
                              to={`/products/${categoryId}/${subcategoryId}/${productId}/${spec}`}
                              className="flex items-center text-primary-600 hover:text-primary-700 transition group"
                            >
                              <span className="mr-2">{spec}</span>
                              <ChevronLeft size={16} className="transition-transform group-hover:translate-x-1" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href={productType.catalogueUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary inline-flex items-center"
                  >
                    <Download size={18} className="mr-2" />
                    Download Catalogue
                  </a>

                  <Link
                    to="/contact"
                    className="btn-primary inline-flex items-center"
                  >
                    <Send size={18} className="mr-2" />
                    Send Enquiry
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 md:order-2"
            >
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src={productType.image}
                  alt={productType.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
