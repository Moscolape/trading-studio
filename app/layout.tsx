"use client"

import { ReactNode, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <div className="flex h-screen">
          
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setIsOpen={setIsSidebarOpen} />

          <div className="flex-1 flex flex-col">
            <Header toggleSidebar={toggleSidebar} />

            <main className="flex-1 p-6">{children}</main>

            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;