import React from 'react';
import { useAuth } from '@/modules/open/auth/hooks/useAuth';
import AppLayout from '@shared/layout/AppLayout';
import { adminNavigation } from '../config/navigation';
import { canPerformAction } from '@shared/utils/permissionUtils';
import { NavigationItem } from '@shared/types/navigation';
// import { Permission } from '@shared/types/user';

const AdminLayout: React.FC = () => {
  const { user } = useAuth();

  const filterNavigation = (items: NavigationItem[]): NavigationItem[] => {
    return items.reduce((acc: NavigationItem[], item) => {
      // 1. Check if item requires permissions
      if (item.permissions && item.permissions.length > 0) {
        // If user has no permissions, skip
        if (!user?.permissions) return acc;

        // Check if user has ALL required permissions (or SOME, depending on logic)
        // Here assuming ANY of the listed permissions is sufficient, or specific logic
        // But let's assume item.permissions is array of "module:action" strings
        const hasAccess = item.permissions.every(p => {
             const [module, action] = p.split(':');
             return canPerformAction(user, module, action);
        });

        if (!hasAccess) return acc;
      }

      // 2. Process children
      if (item.children) {
        const filteredChildren = filterNavigation(item.children);
        if (filteredChildren.length > 0) {
           acc.push({ ...item, children: filteredChildren });
        } else if (!item.permissions) {
           // If it has children but they are all filtered out, 
           // and the parent itself didn't have permission reqs, 
           // do we show it? Maybe not if it's just a container.
           // For now, let's include it only if it has children remaining or is a link itself
           if (item.path) acc.push(item);
        }
      } else {
        acc.push(item);
      }
      
      return acc;
    }, []);
  };

  // For now, if no user, show full nav (or empty? better to show full or loading)
  // Real app would redirect if not auth, but this is layout level.
  const filteredNav = user ? filterNavigation(adminNavigation) : adminNavigation;

  return <AppLayout menuItems={filteredNav} />;
};

export default AdminLayout;
