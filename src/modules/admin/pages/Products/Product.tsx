import React, { useState } from 'react';
import { useGetProductsQuery } from './api/productApi';
import { ProductsTable } from './components/ProductsTable';
import { ProductsFilter } from './components/ProductsFilter';
import { ProductModal } from './components/ProductModal';
// import Button from '@shared/components/ui/button/Button';
// import { PlusIcon } from '@shared/icons';
import { Product, CreateProductPayload } from './types/product';
import ComponentCard from '@/shared/components/common/ComponentCard';
import { useProducts } from './hooks/useProducts';

const Products: React.FC = () => {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data, isLoading } = useGetProductsQuery({ search });
  const { handleCreate: createProduct, handleUpdate: updateProduct, handleDelete: deleteProduct, isCreating, isUpdating } = useProducts();

  // const handleCreate = () => {
  //   setSelectedProduct(null);
  //   setIsModalOpen(true);
  // };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData: CreateProductPayload) => {
    if (selectedProduct) {
      const result = await updateProduct({ id: selectedProduct.id, ...formData });
      if (result.success) {
        setIsModalOpen(false);
      }
    } else {
      const result = await createProduct(formData);
      if (result.success) {
        setIsModalOpen(false);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const result = await deleteProduct(id);
      if (result.success) {
        // Table will auto-refresh due to invalidatesTags
      }
    }
  };

  const header = (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5">
      <div>
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Products
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage system products and inventory
        </p>
      </div>
      {/* <Button onClick={handleCreate} startIcon={<PlusIcon fontSize={20} className="text-white" />}>
        Add Product
      </Button> */}
    </div>
  );

  return (
    <div className="space-y-6">
      <ComponentCard header={header} headerPosition="outside">
        {/* <ProductsFilter search={search} onSearchChange={setSearch} /> */}
        <ProductsTable
          products={data?.data || []}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          product={selectedProduct}
          isLoading={isCreating || isUpdating}
        />
      </ComponentCard>
    </div>
  );
};

export default Products;
