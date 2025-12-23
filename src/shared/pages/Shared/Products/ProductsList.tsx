import React from 'react';
import { useProducts } from '@hooks/useProducts';

const ProductsList: React.FC = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid gap-4">
        {products?.map((product) => (
          <div key={product.id} className="p-4 border rounded-lg">
            <h2 className="font-bold">{product.name}</h2>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
