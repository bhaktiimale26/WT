import { productCategories } from '../data/productData'; // Adjust path if needed
import { useEffect, useState } from 'react';

const Switchgear = ({ subcategoryId }) => {
  console.log('Subcategory ID:', subcategoryId); // Debugging line
  const switchgearCategory = productCategories.find(
    (category) => category.id === 'switchgears'
  );

  const subcategory = switchgearCategory?.subcategories.find(
    (sub) => sub.id === subcategoryId
  );

  if (!subcategory || !subcategory.products || subcategory.products.length === 0) {
    return <div className="p-6 text-center text-red-600">No products found for this subcategory.</div>;
  }

  return (
    <div className="space-y-12">
      {subcategory.products.map((product, productIndex) => {
        const [currentStartIndex, setCurrentStartIndex] = useState(0);
        const allFeatures = product.features;

        const handleNext = () => {
          setCurrentStartIndex((prev) => (prev + 4) % allFeatures.length);
        };

        const handlePrev = () => {
          setCurrentStartIndex((prev) =>
            prev === 0 ? allFeatures.length - 4 : (prev - 4 + allFeatures.length) % allFeatures.length
          );
        };

        useEffect(() => {
          const interval = setInterval(() => {
            handleNext();
          }, 4000);
          return () => clearInterval(interval);
        }, [allFeatures.length]);

        const visibleFeatures = allFeatures.slice(currentStartIndex, currentStartIndex + 4);

        return (
          <div key={productIndex} className="p-6 max-w-6xl mx-auto space-y-12 bg-white">
            {/* Header */}
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{product.title}</h1>
                <p className="text-gray-700 mb-4">{product.description}</p>
              </div>
              <div className="flex justify-center">
                <img
                  src={product.mainImage}
                  alt={product.title}
                  className="w-64 h-auto rounded-lg shadow-lg border"
                />
              </div>
            </div>

            {/* Feature carousel */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 text-center">Key Features</h2>
              <div className="relative flex items-center">
                <button onClick={handlePrev} className="absolute left-0 z-10 px-3 py-2 bg-white border rounded-full shadow-md hover:bg-gray-100">‹</button>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full px-10">
                  {visibleFeatures.map((features, index) => (
                    console.log('Feature:', features), // Debugging line;
                    <div key={index} className="flex flex-col items-center p-4 border rounded-lg shadow hover:shadow-md transition">
                      <img src={features.image} alt={features.title} className="w-12 h-12 object-contain mb-2" />
                      <h3 className="font-semibold text-sm text-center">{features.title}</h3>
                      <p className="text-xs text-gray-600 text-center">{features.description}</p>
                    </div>
                  ))}
                </div>
                <button onClick={handleNext} className="absolute right-0 z-10 px-3 py-2 bg-white border rounded-full shadow-md hover:bg-gray-100">›</button>
              </div>
            </div>
            <div className="row">
              {/* Range Images Section */}
              {product.rangeImages && product.rangeImages.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6">
                  {product.rangeImages.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`Range ${i + 1}`}
                      className="w-full max-w-md mx-auto rounded-lg border shadow-sm object-contain"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Switchgear;
