import React from 'react';
import { PERMISSION_GROUPS } from '@shared/constants/permissions';
import Loading from '@shared/components/common/Loading';

interface PermissionsSelectorProps {
  selectedPermissionIds: string[];
  onPermissionToggle: (permissionId: string) => void;
  isLoading?: boolean;
  permissions?: any[];
}

/**
 * Reusable component for selecting permissions
 * Used in both RoleModal (create) and PermissionAssignmentModal
 * 
 * Filters permission groups to show only those that exist in the backend
 * Works with permission IDs for assignment
 */
export const PermissionsSelector: React.FC<PermissionsSelectorProps> = ({
  selectedPermissionIds,
  onPermissionToggle,
  isLoading = false,
  permissions = [],
}) => {
  // Create a map of slug to permission for lookup
  const permissionsBySlug = new Map(permissions.map(p => [p.slug, p]));

  // Filter permission groups and their permissions based on what exists in the backend
  const filteredGroups = Object.entries(PERMISSION_GROUPS)
    .map(([key, group]) => ({
      key,
      label: group.label,
      description: group.description,
      permissions: group.permissions.filter(p => permissionsBySlug.has(p.slug)),
    }))
    .filter(group => group.permissions.length > 0); // Only show groups that have permissions

  return (
    <div className="relative">
      <Loading type="cover" loading={isLoading} />
      
      {filteredGroups.length === 0 ? (
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
          No permissions available
        </div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredGroups.map(({ key, label, description, permissions: groupPermissions }) => (
            <div key={key} className="border rounded-lg p-4 dark:border-white/[0.05]">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                {label}
              </h4>
              {description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  {description}
                </p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {groupPermissions.map(permission => {
                  // Get the actual permission object to access its ID
                  const permissionData = permissionsBySlug.get(permission.slug);
                  const permissionId = permissionData?.id;
                  const isSelected = permissionId ? selectedPermissionIds.includes(permissionId) : false;
                  
                  return (
                    <label key={permission.slug} className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => permissionId && onPermissionToggle(permissionId)}
                        className="w-4 h-4 rounded accent-brand-500 mt-0.5 flex-shrink-0"
                      />
                      <div className="flex-1">
                        <span className="text-sm block text-gray-700 dark:text-gray-300">
                          {permission.label}
                        </span>
                        {permission.description && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {permission.description}
                          </span>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-gray-50 dark:bg-white/[0.02] rounded-lg p-3 mt-4">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Selected: <span className="text-brand-500 font-semibold">{selectedPermissionIds.length}</span> permission{selectedPermissionIds.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
};
