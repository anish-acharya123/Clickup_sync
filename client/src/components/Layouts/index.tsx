import Footer from "./Footer";
import Navbar from "./Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Layouts/AppSidebar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-gradient-to-r  from-blue-50 to-blue-100 via-[#e8fbff]">
        <SidebarProvider>

          <AppSidebar />
          <div className="w-full min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 ">{children}</main>
            <Footer />
          </div>
        </SidebarProvider>
    </div>
  );
};

export default Layout;
