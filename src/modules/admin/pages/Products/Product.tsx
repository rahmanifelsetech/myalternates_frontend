import React, { useState } from 'react';
import { useGetProductsQuery, usePopulateProductsMutation } from './api/productApi';
import { ProductsTable } from './components/ProductsTable';
// import { ProductsFilter } from './components/ProductsFilter';
import { ProductModal } from './components/ProductModal';
import Button from '@shared/components/ui/button/Button';
import { PlusIcon } from '@shared/icons';
import FetchDataWithConfirm from '@/shared/components/common/FetchDataWithConfirm';
import { Product, CreateProductPayload } from './types/product';
import ComponentCard from '@/shared/components/common/ComponentCard';
import { useProducts } from './hooks/useProducts';
import { typographyClasses } from '@shared/utils/typographyUtils';
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
        <h2 className={`${typographyClasses.heading.h2} ${typographyClasses.colors.text.primary}`}>
          Products
        </h2>
        <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted}`}>
          Manage system products and inventory
        </p>
      </div>
      <div className="flex gap-2">
        {/* <CanAccess any={[PERMISSIONS.PRODUCTS.POPULATE]}>
          <FetchDataWithConfirm
            onConfirm={populateProducts}
            buttonText="Populate Products"
            modalTitle="Confirm Populate"
            modalDescription="Are you sure you want to populate products? This will fetch data from an external API."
            isLoading={isPopulating}
          />
        </CanAccess> */}
        <CanAccess any={[PERMISSIONS.PRODUCTS.CREATE]}>
          <Button onClick={handleCreate} startIcon={<PlusIcon fontSize={20} className="text-white" />}>
            Add Product
          </Button>
        </CanAccess>
      </div>
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
