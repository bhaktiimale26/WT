import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import ProductTypeCard from "../components/ProductTypeCard";
import { productCategories } from "../data/productData";
import FanCard from "../components/FanCard";
import SolarProductNavigator from "../components/SolarProductNavigator"; // Import solar product navigator
import Switchgear from "./Switchgear";
import SolarCard from "../components/Solarcard"; // Import solar card

const ProductSubcategory = () => {
  const { categoryId, subcategoryId } = useParams();
  const navigate = useNavigate();
  const { typeId, subtypeId } = useParams();

  const category = productCategories.find((cat) => cat.id === categoryId);
  const subcategory = category?.subcategories?.find(
    (sub) => sub.id === subcategoryId
  );

  console.log("categoryId", categoryId);
  console.log("subcategoryId", subcategoryId);
  console.log("typeId", typeId);
  console.log("subtypeId", subtypeId);

  if (!category || !subcategory) {
    return (
      <div className="section container-custom pt-32 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Product Subcategory Not Found
        </h2>
        <p className="mb-8">
          The product subcategory you're looking for doesn't exist.
        </p>
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
          backgroundImage: `url('${subcategory.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="container-custom relative z-10">
          <button
            className="inline-flex items-center text-white mb-6 hover:text-primary-300 transition"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={20} className="mr-1" />
            Back to {category.name}
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {subcategory.name}
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl">
              {subcategory.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Types or Products */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-gray-900 mb-12 text-center"
          >
            Available Types
          </motion.h2>

          {subcategory.types && subcategory.types.length > 0 ? (
            category.id === "solar" ? (
              <SolarProductNavigator
                category={category}
                subcategory={subcategory}
                selectedTypeId={typeId}
                selectedSubtypeId={subtypeId}
              />
            ) : (
            //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            //     {subcategory.types.map((type, index) => (
            //       <Link
            //         to={
            //           type.products && type.products.length > 0
            //             ? `/products/${category.id}/${subcategory.id}/${type.id}/products`
            //             : `/products/${category.id}/${subcategory.id}/${type.id}`
            //         }
            //         key={type.id}
            //         className="block"
            //       >
            //         <ProductTypeCard
            //           productType={type}
            //           categoryId={category.id}
            //           subcategoryId={subcategory.id}
            //           index={index}
            //         />
            //       </Link>
            //     ))}
            //   </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {subcategory.types.map((type, index) => {
    const shouldLink = category.id === "fans";
    const path =
      type.products && type.products.length > 0
        ? `/products/fans/${subcategory.id}/${type.id}/products`
        : `/products/${category.id}/${subcategory.id}/${type.id}`;

    return shouldLink ? (
      <Link to={path} key={type.id} className="block">
        <ProductTypeCard
          productType={type}
          categoryId={category.id}
          subcategoryId={subcategory.id}
          index={index}
        />
      </Link>
    ) : (
      <div key={type.id} className="block">
        <ProductTypeCard
          productType={type}
          categoryId={category.id}
          subcategoryId={subcategory.id}
          index={index}
        />
      </div>
    );
  })}
</div>

            )
          ) : subcategory.products && subcategory.products.length > 0 ? (
            category.id === "switchgears" ? (
              <div>
                {subcategory.products.map((product, index) => (
                  <Switchgear
                    key={index}
                    subcategoryId={subcategory.id}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <div>
                {subcategory.products.map((product, index) => (
                  <FanCard key={index} product={product} />
                ))}
              </div>
            )
          ) : subcategory.features && subcategory.features.length > 0 ? (
            <SolarCard
              title={subcategory.name}
              description={subcategory.description}
              features={subcategory.features}
              image={subcategory.image}
              catalogueUrl={subcategory.catalogueUrl}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No products available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="py-8 bg-white">
        <div className="container-custom">
          <div className="flex flex-wrap items-center text-sm text-gray-600">
            <Link to="/products" className="hover:text-primary-600 transition">
              Products
            </Link>
            <span className="mx-2">/</span>
            <Link
              to={`/products/${category.id}`}
              className="hover:text-primary-600 transition"
            >
              {category.name}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">
              {subcategory.name}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductSubcategory;
