import React from "react";
import { useParams } from "react-router-dom";
import { productCategories } from "../data/productData";
import FanCard from "../components/FanCard";

const PremiumFanList = () => {
    const { categoryId: paramCategoryId, subcategoryId, typeId } = useParams();
    const categoryId = paramCategoryId || "fans";
    
  console.log("In Pem");
  
  console.log("categoryId", categoryId);
    console.log("subcategoryId", subcategoryId);
    console.log("typeId", typeId);
  

  const category = productCategories.find((cat) => cat.id === categoryId);
  const subcategory = category?.subcategories?.find(
    (sub) => sub.id === subcategoryId
  );

  // Try to fetch products from a specific type
  const type = subcategory?.types?.find((t) => t.id === typeId);
  const productsFromType = type?.products;

  // Fallback to products directly on the subcategory (if no typeId or no types at all)
  const productsFromSubcategory =
    (!subcategory?.types || subcategory.types.length === 0 || !typeId) &&
    subcategory?.products;

  const products = productsFromType || productsFromSubcategory;

  if (!products || products.length === 0) {
    return (
      <div className="text-center pt-32">
        <h2 className="text-2xl font-bold">No fans found for this selection.</h2>
      </div>
    );
  }

  const pageTitle = type?.name || subcategory?.name || "Fan Products";

  return (
    <div className="pt-32 space-y-12 container-custom">
      <h1 className="text-4xl font-bold text-center mb-12">{pageTitle}</h1>
      {products.map((product, idx) => (
        <FanCard key={idx} product={product} />
      ))}
    </div>
  );
};

export default PremiumFanList;
