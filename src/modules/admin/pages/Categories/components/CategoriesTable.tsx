import React from 'react';
import { Category } from '../types/category';
import { IconButton } from '@shared/components/ui/button/IconButton';
import { PencilIcon, TrashBinIcon } from '@shared/icons';
import { CanAccess } from '@/shared/components/common/CanAccess';
import { PERMISSIONS } from '@/shared/constants/permissions';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@shared/components/ui/table';

interface CategoriesTableProps {
  categories: Category[];
  isLoading: boolean;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

export const CategoriesTable: React.FC<CategoriesTableProps> = ({
  categories,
  isLoading,
  onEdit,
  onDelete,
}) => {
  if (isLoading) {
    return <div className="p-4 text-center">Loading categories...</div>;
  }

  if (categories.length === 0) {
    return <div className="p-4 text-center text-gray-500">No categories found.</div>;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Name
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Color
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-sm dark:text-gray-400">
                  <h5 className="font-medium text-gray-800 dark:text-white/90">
                    {category.name}
                  </h5>
                  {category.description && (
                    <p className="text-sm text-gray-500">{category.description}</p>
                  )}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {category.color && (
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: category.color }}></span>
                      <span className="text-black dark:text-white">{category.color}</span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    category.isActive
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
                      // : category.isActive === 'suspended'
                      // ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
                  }`}>
                    {category.isActive ? "Active" : 'inactive'}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex items-center space-x-3.5">
                    <CanAccess any={[PERMISSIONS.MASTERS.CATEGORY_UPDATE]}>
                      <IconButton
                        onClick={() => onEdit(category)}
                        className="hover:text-primary"
                        icon={<PencilIcon className="size-5" />}
                      />
                    </CanAccess>
                    <CanAccess any={[PERMISSIONS.MASTERS.CATEGORY_DELETE]}>
                      <IconButton
                        onClick={() => onDelete(category.id)}
                        className="hover:text-error-500"
                        icon={<TrashBinIcon className="size-5" />}
                      />
                    </CanAccess>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};