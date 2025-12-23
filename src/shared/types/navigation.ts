export interface NavigationItem {
  title: string;
  path: string;
  icon: string;
  badge?: string | number;
  children?: NavigationItem[];
  permissions?: string[];
}
