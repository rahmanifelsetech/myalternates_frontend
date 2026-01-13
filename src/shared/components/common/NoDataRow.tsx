import React from 'react';
import { TableCell, TableRow } from '@shared/components/ui/table';

interface NoDataRowProps {
  colSpan: number;
  message?: string;
}

const NoDataRow: React.FC<NoDataRowProps> = ({ colSpan, message = 'No data found.' }) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="text-center text-gray-500 py-4 text-theme-sm">
        {message}
      </TableCell>
    </TableRow>
  );
};

export default NoDataRow;