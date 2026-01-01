import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import * as Icons from "../icons";
import { useSidebar } from "../context/SidebarContext";
// import SidebarWidget from "./SidebarWidget";
import type { NavigationItem } from "@/shared/types/navigation";
import Button from "../components/ui/button/Button";
import { useAuth } from "@/modules/open/auth/hooks/useAuth";

// Helper to render icon from string name
const renderIcon = (iconName: string) => {
  // Convert kebab-case or similar to PascalCase with Icon suffix if needed
  // But assuming the navigation config provides the exact export name from @icons
  // If the config provides "grid", we might need to look for "GridIcon"
  
  // Let's try to find exact match first, then append "Icon", then "LineIcon"
  // Or assuming the navigation config uses the exact export name.
  
  // Based on admin.navigation.tsx provided earlier: icon: 'grid', 'users', etc.
  // And icons/index.ts exports: GridIcon, UserIcon (not UsersIcon), etc.
  // We need a mapping or smart resolution.
  
  const pascalCase = iconName.charAt(0).toUpperCase() + iconName.slice(1);
  const iconKey = `${pascalCase}Icon`;
  
  const IconComponent = (Icons as any)[iconKey] || (Icons as any)[iconName] || Icons.GridIcon;
  
  return <IconComponent />;
};

interface AppSidebarProps {
  menuItems: NavigationItem[];
}

const AppSidebar: React.FC<AppSidebarProps> = ({ menuItems }) => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();
  const { signOut } = useAuth();

  const [openSubmenu, setOpenSubmenu] = useState<{
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<number, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    menuItems.forEach((nav, index) => {
      if (nav.children) {
        nav.children.forEach((subItem) => {
          if (isActive(subItem.path)) {
            setOpenSubmenu({
              index,
            });
            submenuMatched = true;
          }
        });
      }
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive, menuItems]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = openSubmenu.index;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { index };
    });
  };

  const renderMenuItems = (items: NavigationItem[]) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.title}>
          {nav.children ? (
            nav.path && nav.path !== '#' ? (
              <Link
                to={nav.path}
                className={`menu-item group ${
                  openSubmenu?.index === index
                    ? "menu-item-active"
                    : "menu-item-inactive"
                } cursor-pointer ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "lg:justify-start"
                }`}
              >
                <span
                  className={`menu-item-icon-size  ${
                    openSubmenu?.index === index
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {renderIcon(nav.icon)}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.title}</span>
                )}
                {(isExpanded || isHovered || isMobileOpen) && (
                  <Icons.ChevronDownIcon
                    className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                      openSubmenu?.index === index
                        ? "rotate-180 text-brand-500"
                        : ""
                    }`}
                  />
                )}
              </Link>
            ) : (
              <button
                onClick={() => handleSubmenuToggle(index)}
                className={`menu-item group ${
                  openSubmenu?.index === index
                    ? "menu-item-active"
                    : "menu-item-inactive"
                } cursor-pointer ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "lg:justify-start"
                }`}
              >
                <span
                  className={`menu-item-icon-size  ${
                    openSubmenu?.index === index
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {renderIcon(nav.icon)}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.title}</span>
                )}
                {(isExpanded || isHovered || isMobileOpen) && (
                  <Icons.ChevronDownIcon
                    className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                      openSubmenu?.index === index
                        ? "rotate-180 text-brand-500"
                        : ""
                    }`}
                  />
                )}
              </button>
            )
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {renderIcon(nav.icon)}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.title}</span>
                )}
              </Link>
            )
          )}
          {nav.children && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[index] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.index === index
                    ? `${subMenuHeight[index]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.children.map((subItem) => (
                  <li key={subItem.title}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.title}
                      {/* Badge logic can be added here if needed */}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  const handleLogout = async () => {
    await signOut()
    window.location.href = '/auth/signin';
  }
  

  return (
    <aside
      className={`fixed flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex ${
          !isExpanded && !isHovered && !isMobileOpen ? "lg:justify-center py-5.5" : "justify-start"
        } py-4 px-2 mb-4 border-b border-gray-200 dark:border-gray-800`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                className="dark:hidden"
                src="/images/logo/logo.svg"
                alt="Logo"
                width={200}
                height={40}
              />
              <img
                className="hidden dark:block"
                src="/images/logo/logo-dark.svg"
                alt="Logo"
                width={200}
                height={40}
              />
            </>
          ) : (
            <img
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  ""
                ) : (
                  <Icons.HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(menuItems)}
            </div>
          </div>
        </nav>
        {/* A fixed logout button at the bottom of the menu */}
        <div className="fixed bottom-2 right-5 left-5">
          <Button
            onClick={handleLogout}
            className="w-full group menu-item-text"
            variant="outline"
            startIcon={<Icons.LogOutIcon fontSize={20} className="group-hover:text-gray-50 dark:text-gray-100 dark:group-hover:text-brand-700" />}
          >
            {(isExpanded || isHovered || isMobileOpen) && (
              <span className="menu-item-text">Sign out</span>
            )}
          </Button>
        </div>
        {/* {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null} */}
      </div>
    </aside>
  );
};

export default AppSidebar;
