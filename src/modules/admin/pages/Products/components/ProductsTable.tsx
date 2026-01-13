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
import { PencilIcon } from '@shared/icons';
import Loading from '@shared/components/common/Loading';
import { typographyClasses } from '@shared/utils/typographyUtils';
import { CanAccess } from '@/shared/components/common/CanAccess';
import { PERMISSIONS } from '@/shared/constants/permissions';
import NoDataRow from '@/shared/components/common/NoDataRow';

interface ProductsTableProps {
  products: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export const ProductsTable: React.FC<ProductsTableProps> = ({ products, isLoading, onEdit }) => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <Loading type="cover" loading={isLoading} />
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                Name
              </TableCell>
              <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                Description
              </TableCell>
              <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                Status
              </TableCell>
              <TableCell isHeader className={`px-5 py-3 text-end ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {
              !isLoading && products.length === 0 && (
                <NoDataRow colSpan={4} message="No products found." />
              )
            }
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className={`px-5 py-4 ${typographyClasses.body.small} ${typographyClasses.colors.text.primary}`}>
                  {product.name}
                </TableCell>
                <TableCell className={`px-5 py-4 ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                  {product.desc || '-'}
                </TableCell>
                <TableCell className={`px-5 py-4 ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                  <span className={`inline-block px-2 py-1 rounded ${typographyClasses.body.caption} ${
                    product.isActive
                      ? 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-100' 
                      : 'bg-error-100 text-error-800 dark:bg-error-700 dark:text-error-100'
                  }`}>
                    {product.isActive ? "Active" : 'Inactive'}
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
