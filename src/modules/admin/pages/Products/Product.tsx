import React, { useState } from 'react';
import { useGetProductsQuery } from './api/productApi';
import { ProductsTable } from './components/ProductsTable';
// import { ProductsFilter } from './components/ProductsFilter';
import { ProductModal } from './components/ProductModal';
import Button from '@shared/components/ui/button/Button';
import { PlusIcon } from '@shared/icons';
import { Product, CreateProductPayload } from './types/product';
import ComponentCard from '@/shared/components/common/ComponentCard';
import { useProducts } from './hooks/useProducts';
import { CanAccess } from '@/shared/components/common/CanAccess';
import { PERMISSIONS } from '@/shared/constants/permissions';

import { Pagination } from '@shared/components/common/Pagination';

const Products: React.FC = () => {
  // const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data, isLoading } = useGetProductsQuery({ page, limit: 10 });
  const { handleCreate: createProduct, handleUpdate: updateProduct, handleDelete: deleteProduct, isCreating, isUpdating } = useProducts();

  const handleCreate = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData: CreateProductPayload) => {
    if (selectedProduct) {
      await updateProduct({ id: selectedProduct.id, ...formData });
      setIsModalOpen(false);
    } else {
      await createProduct(formData);
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
      // Table will auto-refresh due to invalidatesTags
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
      <CanAccess any={[PERMISSIONS.PRODUCTS.CREATE]}>
        <Button onClick={handleCreate} startIcon={<PlusIcon fontSize={20} className="text-white" />}>
          Add Product
        </Button>
      </CanAccess>
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

        {data?.metaData && (
          <Pagination meta={data.metaData} onPageChange={setPage} />
        )}

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
