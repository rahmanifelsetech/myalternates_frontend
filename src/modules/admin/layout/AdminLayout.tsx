
import { useAuth } from '@/modules/open/auth/hooks/useAuth';
import AppLayout from '@shared/layout/AppLayout';
import { getFilteredNavigation } from '../config/navigation';
// import { NavigationItem } from '@shared/types/navigation';

const AdminLayout: React.FC = () => {
  const { user } = useAuth();

  const filteredNav = getFilteredNavigation(user);

  return <AppLayout menuItems={filteredNav} />;
};

export default AdminLayout;
