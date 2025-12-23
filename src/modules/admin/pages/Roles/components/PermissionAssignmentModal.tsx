import React, { useEffect, useState } from 'react';
import { Modal } from '@shared/components/ui/modal';
import Button from '@shared/components/ui/button/Button';
import { PermissionsSelector } from './PermissionsSelector';
import { usePermissionsList } from '../../Permissions/hooks/usePermissionsList';
import { Role } from '../types/role';

interface PermissionAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (permissionIds: string[]) => Promise<void>;
  role?: Role | null;
  isLoading?: boolean;
}

export const PermissionAssignmentModal: React.FC<PermissionAssignmentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  role,
  isLoading,
}) => {
  const { permissions, isLoading: isLoadingPermissions } = usePermissionsList();
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<string[]>([]);

  useEffect(() => {
    if (role && isOpen) {
      if (role.permissions) {
        const permissionIds = role.permissions.map(p => p.permissionId);
        setSelectedPermissionIds(permissionIds);
      } else {
        setSelectedPermissionIds([]);
      }
    }


  }, [role, isOpen, permissions]);

  const handlePermissionToggle = (permissionId: string) => {
    setSelectedPermissionIds(prev => 
      prev.includes(permissionId)
        ? prev.filter(p => p !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleSave = async () => {
    if (onSave) {
      await onSave(selectedPermissionIds);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
      <h3 className="text-xl font-semibold mb-1 text-gray-800 dark:text-white">
        Assign Permissions
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {role?.name}
      </p>

      <div className="mb-6">
        <PermissionsSelector
          selectedPermissionIds={selectedPermissionIds}
          onPermissionToggle={handlePermissionToggle}
          isLoading={isLoadingPermissions}
          permissions={permissions}
        />
      </div>

      <div className="flex justify-end gap-3 border-t pt-4">
        <Button variant="outline" onClick={onClose} type="button">
          Cancel
        </Button>
        <Button type="button" loading={isLoading} disabled={isLoading} onClick={handleSave}>
          {isLoading ? 'Saving...' : 'Save Permissions'}
        </Button>
      </div>
    </Modal>
  );
};
