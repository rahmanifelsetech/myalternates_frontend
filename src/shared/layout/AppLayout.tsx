import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import Container from "../components/common/Container";
import Footer from "./Footer";
import type { NavigationItem } from "@/shared/types/navigation";

interface AppLayoutProps {
  menuItems: NavigationItem[];
}

const LayoutContent: React.FC<AppLayoutProps> = ({ menuItems }) => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar menuItems={menuItems} />
        <Backdrop />
      </div>
      <div
       className={`flex-1 transition-all duration-300 ease-in-out flex flex-col h-screen overflow-hidden ${
         isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
       } ${isMobileOpen ? "ml-0" : ""}`}
     >
       <AppHeader />
       <Container className="flex-1 overflow-y-auto">
          <Outlet />
          <Footer />
       </Container>
     </div>
    </div>
  );
};

const AppLayout: React.FC<AppLayoutProps> = ({ menuItems }) => {
  return (
    <SidebarProvider>
      <LayoutContent menuItems={menuItems} />
    </SidebarProvider>
  );
};

export default AppLayout;
