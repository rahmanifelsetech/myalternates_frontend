import React, { useState } from 'react';
import { useGetCategoriesQuery } from './api/categoryApi';
import { CategoriesTable } from './components/CategoriesTable';
import { CategoriesFilter } from './components/CategoriesFilter';
import { CategoryModal } from './components/CategoryModal';
import Button from '@shared/components/ui/button/Button';
import { PlusIcon } from '@shared/icons';
import { Category, CreateCategoryPayload } from './types/category';
import ComponentCard from '@/shared/components/common/ComponentCard';
import { useCategories } from './hooks/useCategories';
import { typographyClasses } from '@shared/utils/typographyUtils';
import { CanAccess } from '@/shared/components/common/CanAccess';
import { PERMISSIONS } from '@/shared/constants/permissions';

import { Pagination } from '@shared/components/common/Pagination';

const Categories: React.FC = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const { data, isLoading } = useGetCategoriesQuery({ search, page, limit: 10 });
  const { handleCreate: createCategory, handleUpdate: updateCategory, handleDelete: deleteCategory, isCreating, isUpdating } = useCategories();

  const handleCreate = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData: CreateCategoryPayload) => {
    if (selectedCategory) {
      await updateCategory({ id: selectedCategory.id, ...formData });
      setIsModalOpen(false);
    } else {
      await createCategory(formData);
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      await deleteCategory(id);
    }
  };

  const header = (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5">
      <div>
        <h2 className={`${typographyClasses.heading.h2} ${typographyClasses.colors.text.primary}`}>
          Categories
        </h2>
        <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted}`}>
          Manage product categories
        </p>
      </div>
      <CanAccess any={[PERMISSIONS.MASTERS.CATEGORY_CREATE]}>
        <Button onClick={handleCreate} startIcon={<PlusIcon fontSize={20} className="text-white" />}>
          Add Category
        </Button>
      </CanAccess>
    </div>
  );

  return (
    <div className="space-y-6">
      <ComponentCard header={header} headerPosition="outside">
        <CategoriesFilter search={search} onSearchChange={setSearch} />
        <CategoriesTable
          categories={data?.data || []}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {data?.metaData && (
          <Pagination meta={data.metaData} onPageChange={setPage} />
        )}

        <CategoryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          category={selectedCategory}
          isLoading={isCreating || isUpdating}
        />
      </ComponentCard>
    </div>
  );
};

export default Categories;