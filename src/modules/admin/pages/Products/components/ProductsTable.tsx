import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@shared/components/ui/table';
import { Product } from '../types/product';
import { IconButton } from '@shared/components/ui/button/IconButton';
import { PencilIcon, TrashBinIcon } from '@shared/icons';
import Loading from '@shared/components/common/Loading';
import { CanAccess } from '@/shared/components/common/CanAccess';
import { PERMISSIONS } from '@/shared/constants/permissions';

interface ProductsTableProps {
  products: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export const ProductsTable: React.FC<ProductsTableProps> = ({ products, isLoading, onEdit, onDelete }) => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <Loading type="cover" loading={isLoading} />
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Name
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Description
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Status
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400">
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {
              !isLoading && products.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="px-5 py-4 text-center text-gray-500 text-theme-sm dark:text-gray-400">
                    No products found
                  </TableCell>
                </TableRow>
              )
            }
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="px-5 py-4 text-gray-800 text-theme-sm dark:text-white/90">
                  {product.name}
                </TableCell>
                <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.desc || '-'}
                </TableCell>
                <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    product.isActive
                      ? 'bg-success/10 text-success'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
                  }`}>
                    {product.isActive ? 'Active' : 'Inactive'}
                  </span>
                </TableCell>
                <TableCell className="px-5 py-4 text-end">
                  <div className="flex justify-end gap-2">
                    <CanAccess any={[PERMISSIONS.PRODUCTS.UPDATE]}>
                      <IconButton
                        onClick={() => onEdit(product)}
                        className="hover:text-brand-500"
                        icon={<PencilIcon className="w-5 h-5" />}
                      />
                    </CanAccess>
                    {/* <CanAccess any={[PERMISSIONS.PRODUCTS.DELETE]}>
                      <IconButton
                        onClick={() => onDelete(product.id)}
                        className="hover:text-error-500"
                        icon={<TrashBinIcon className="w-5 h-5" />}
                      />
                    </CanAccess> */}
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
